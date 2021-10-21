import fetch, { RequestInit } from 'node-fetch';
import * as soap from 'soap'
import { IAfasConnectorConfig, THttpMethods } from '../models';
import { endpoints } from '../constants';

export default abstract class Connector {
  private AfasConfig: IAfasConnectorConfig;
  constructor(AfasConfig: IAfasConnectorConfig) {
    this.AfasConfig = AfasConfig;
  }

  // Should the env variable contain text, its trimmed and only the numbers are returned
  private get env() {
    return this.AfasConfig.env.replace(/[^\d.]/g, '');
  }

  private get type() {
    return this.AfasConfig.type ? this.AfasConfig.type : 'rest'
  }

  private get profitservice () {
    return this.type === 'rest' ? 'ProfitRestServices' : 'ProfitServices'
  }

  private get apiKey() {
    return this.AfasConfig.apiKey;
  }

  protected get afasUrl() {
    return 'https://' + this.env + '.' + endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/`;
  }

  protected get connectorUrl() {
    return 'https://' + this.env + '.' + endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/connectors/`;
  }

  protected get metainfoUrl() {
    return 'https://' + this.env + '.' + endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/metainfo/`;
  }

  /**
   * HTTP function with AFAS authorization
   *
   * @param url {string} http://example.com
   * @param method {string} GET, POST, PUT, DELETE
   * @param body {string} Optional, should be a valid JSON object
   * @param customConfig {RequestInit} default http request config
   */
  protected async http(url: string, method: THttpMethods, body?: object, customConfig?: RequestInit) {
    let config: RequestInit = {
      method,
      headers: {
        Authorization: 'AfasToken ' + Buffer.from(this.apiKey).toString('base64')
      }
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    if (customConfig) {
      config = { ...config, ...customConfig };
    }

    const response = await fetch(url, config);

    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
      } else {
        return response.text();
      }
    } else {
      switch (response.status) {
        case 401:
          throw new Error('Invalid AFAS credentials');
        case 404:
          throw new Error('Connector does not exist');
        case 500:
          throw new Error('Internal server error');
        default:
          throw new Error(`Unknown error occured: ${response.statusText}`);
      }
    }
  }

  protected async httpSoap (url: string, args: object, methodname: string) {
    try {
      const client = await soap.createClientAsync(url)

      return await new Promise((resolve, reject) => {
        client[methodname]({...args, 'token': this.apiKey}, (err: any, result:any) => {
          if (err) reject(err)
          resolve(result)
        })
      })
    } catch (error:any) {
      if (error.body) {
        throw new Error(error.body)
      } else {
        throw new Error(error)
      }
    }
  }
}
