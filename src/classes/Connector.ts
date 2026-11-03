import {
  IAfasConnectorConfig,
  IOtpResponse,
  Languages,
  TAfasRestProfileResponse,
  THttpMethods,
} from '../models/index.js';
import { endpoints } from '../constants/index.js';
import { escapeXml, unescapeXml } from '../utils/xml.js';
import Authentication from './Authentication.js';

export default abstract class Connector {
  private AfasConfig: IAfasConnectorConfig;
  private auth: Authentication;

  constructor(AfasConfig: IAfasConnectorConfig, auth: Authentication) {
    this.AfasConfig = AfasConfig;
    this.auth = auth;
  }

  // Should the env variable contain text, its trimmed and only the numbers are returned
  private get env() {
    return this.AfasConfig.env.replace(/[^\d.]/g, '');
  }

  private get type() {
    return this.AfasConfig.type ? this.AfasConfig.type : 'rest';
  }

  private get profitservice() {
    return this.type === 'rest' ? 'ProfitRestServices' : 'ProfitServices';
  }

  private get language() {
    return this.AfasConfig.language ? this.AfasConfig.language : Languages.Dutch;
  }

  protected get afasUrl() {
    return 'https://' + this.env + '.' + endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/`;
  }

  protected get connectorUrl() {
    return (
      'https://' + this.env + '.' + endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/connectors/`
    );
  }

  protected get metainfoUrl() {
    return (
      'https://' + this.env + '.' + endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/metainfo/`
    );
  }

  protected get insiteUrl() {
    return 'https://' + this.env + '.afasinsite.nl';
  }

  protected async profileRequest(tokenUrl: string, data: any): Promise<TAfasRestProfileResponse | false> {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (response.ok) {
      return (await response.json()) as TAfasRestProfileResponse;
    } else {
      return false;
    }
  }

  protected async OTPRequest(userid: string, apiKey: string, apiToken: string): Promise<boolean> {
    const url = this.afasUrl + 'otprequest';
    const data = {
      userid,
      apiKey,
      apiToken,
    };

    const response = await fetch(url, { method: 'POST', body: JSON.stringify(data) });

    if (response.ok) {
      // Reponse is 201 even if the apiKey and apiToken do not match
      return true;
    } else {
      return false;
    }
  }

  protected async OTPValidate(userid: string, apiKey: string, apiToken: string, otp: string): Promise<string | false> {
    const url = this.afasUrl + 'otpvalidation';
    const data = {
      userid,
      apiKey,
      apiToken,
      otp,
    };

    const response = await fetch(url, { method: 'POST', body: JSON.stringify(data) });

    if (response.ok) {
      const body: IOtpResponse = (await response.json()) as IOtpResponse;
      return body.token;
    } else {
      return false;
    }
  }

  /**
   * HTTP function with AFAS authorization
   *
   * @param url {string} http://example.com
   * @param method {string} GET, POST, PUT, DELETE
   * @param body {string} Optional, should be a valid JSON object
   * @param customHeaders {object} Add some custom headers
   */
  protected async http(
    url: string,
    method: THttpMethods,
    body?: Record<string, any>,
    customHeaders?: Record<string, any>,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const config: RequestInit | any = {
        method,
        headers: {
          'Accept-Language': this.language,
        },
      };

      if (body) {
        config.body = JSON.stringify(body);
      }

      if (customHeaders) {
        for (const key of Object.keys(customHeaders)) {
          config.headers[key] = customHeaders[key];
        }
      }

      try {
        const response = await this.auth.fetch(url, config);
        const rawBody = await response.text();
        if (response.ok) {
          try {
            resolve(JSON.parse(rawBody));
          } catch (error) {
            resolve(rawBody);
          }
        } else {
          reject({ body: rawBody, response });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * SOAP request with AFAS token
   *
   * @param url {string} Service url, example: https://12345.soap.afas.online/ProfitServices/AppConnectorGet.asmx
   * @param service {string} Service name from the WSDL, example: ConnectorAppGet
   * @param operation {string} Operation name from the WSDL, example: GetData
   * @param args {object} Arguments in the order the WSDL defines them, a classic token is added as the first argument
   * @returns {string} Decoded content of the <operation>Result element
   */
  protected async execute(
    url: string,
    service: string,
    operation: string,
    args: Record<string, string | number>,
  ): Promise<string> {
    const token = this.auth.envelopeToken;
    const values: Record<string, string | number> = token === undefined ? { ...args } : { token, ...args };
    const params = Object.keys(values)
      .map((key) => `<${key}>${escapeXml(String(values[key]))}</${key}>`)
      .join('');

    const envelope =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>' +
      `<${operation} xmlns="urn:Afas.Profit.Services">${params}</${operation}>` +
      '</soap:Body></soap:Envelope>';

    const response = await this.auth.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction: `"urn:Afas.Profit.Services/${service}/${operation}"`,
      },
      body: envelope,
    });
    const rawBody = await response.text();

    if (!response.ok) {
      throw { body: rawBody, response };
    }

    // The result holds escaped XML, so it can't contain its own closing tag
    const result = rawBody.match(new RegExp(`<${operation}Result>([\\s\\S]*?)</${operation}Result>`));
    return result ? unescapeXml(result[1]) : '';
  }
}
