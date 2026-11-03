var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Languages, } from '../models/index.js';
import { endpoints } from '../constants/index.js';
import { escapeXml, unescapeXml } from '../utils/xml.js';
export default class Connector {
    constructor(AfasConfig, auth) {
        this.AfasConfig = AfasConfig;
        this.auth = auth;
    }
    // Should the env variable contain text, its trimmed and only the numbers are returned
    get env() {
        return this.AfasConfig.env.replace(/[^\d.]/g, '');
    }
    get type() {
        return this.AfasConfig.type ? this.AfasConfig.type : 'rest';
    }
    get profitservice() {
        return this.type === 'rest' ? 'ProfitRestServices' : 'ProfitServices';
    }
    get language() {
        return this.AfasConfig.language ? this.AfasConfig.language : Languages.Dutch;
    }
    get afasUrl() {
        return 'https://' + this.env + '.' + endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/`;
    }
    get connectorUrl() {
        return ('https://' + this.env + '.' + endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/connectors/`);
    }
    get metainfoUrl() {
        return ('https://' + this.env + '.' + endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/metainfo/`);
    }
    get insiteUrl() {
        return 'https://' + this.env + '.afasinsite.nl';
    }
    profileRequest(tokenUrl, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(tokenUrl, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            if (response.ok) {
                return (yield response.json());
            }
            else {
                return false;
            }
        });
    }
    OTPRequest(userid, apiKey, apiToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.afasUrl + 'otprequest';
            const data = {
                userid,
                apiKey,
                apiToken,
            };
            const response = yield fetch(url, { method: 'POST', body: JSON.stringify(data) });
            if (response.ok) {
                // Reponse is 201 even if the apiKey and apiToken do not match
                return true;
            }
            else {
                return false;
            }
        });
    }
    OTPValidate(userid, apiKey, apiToken, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.afasUrl + 'otpvalidation';
            const data = {
                userid,
                apiKey,
                apiToken,
                otp,
            };
            const response = yield fetch(url, { method: 'POST', body: JSON.stringify(data) });
            if (response.ok) {
                const body = (yield response.json());
                return body.token;
            }
            else {
                return false;
            }
        });
    }
    /**
     * HTTP function with AFAS authorization
     *
     * @param url {string} http://example.com
     * @param method {string} GET, POST, PUT, DELETE
     * @param body {string} Optional, should be a valid JSON object
     * @param customHeaders {object} Add some custom headers
     */
    http(url, method, body, customHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const config = {
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
                    const response = yield this.auth.fetch(url, config);
                    const rawBody = yield response.text();
                    if (response.ok) {
                        try {
                            resolve(JSON.parse(rawBody));
                        }
                        catch (error) {
                            resolve(rawBody);
                        }
                    }
                    else {
                        reject({ body: rawBody, response });
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
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
    execute(url, service, operation, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.auth.envelopeToken;
            const values = token === undefined ? Object.assign({}, args) : Object.assign({ token }, args);
            const params = Object.keys(values)
                .map((key) => `<${key}>${escapeXml(String(values[key]))}</${key}>`)
                .join('');
            const envelope = '<?xml version="1.0" encoding="utf-8"?>' +
                '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>' +
                `<${operation} xmlns="urn:Afas.Profit.Services">${params}</${operation}>` +
                '</soap:Body></soap:Envelope>';
            const response = yield this.auth.fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml; charset=utf-8',
                    SOAPAction: `"urn:Afas.Profit.Services/${service}/${operation}"`,
                },
                body: envelope,
            });
            const rawBody = yield response.text();
            if (!response.ok) {
                throw { body: rawBody, response };
            }
            // The result holds escaped XML, so it can't contain its own closing tag
            const result = rawBody.match(new RegExp(`<${operation}Result>([\\s\\S]*?)</${operation}Result>`));
            return result ? unescapeXml(result[1]) : '';
        });
    }
}
