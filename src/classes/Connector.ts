import { IAfasConfig, IAfasConnectorConfig, THttpMethods } from '../models';
import fetch, { RequestInit } from 'node-fetch';
import constants from '../constants';

export default abstract class Connector {
  private _AfasConfig: IAfasConnectorConfig;

  constructor(AfasConfig: IAfasConnectorConfig | IAfasConfig) {
    this._AfasConfig = AfasConfig;
  }

  // Should the env variable contain text, its trimmed and only the numbers are returned
  private get env() {
    return this._AfasConfig.env.replace(/[^\d.]/g, '');
  }

  private get apiKey() {
    return this._AfasConfig.apiKey;
  }

  protected get connectorName() {
    return this._AfasConfig.connector;
  }

  protected get afasUrl() {
    return 'https://' + this.env + '.' + constants[this._AfasConfig.envType] + '/ProfitRestServices/';
  }

  protected get connectorUrl() {
    return 'https://' + this.env + '.' + constants[this._AfasConfig.envType] + '/ProfitRestServices/connectors/';
  }

  protected get metainfoUrl() {
    return 'https://' + this.env + '.' + constants[this._AfasConfig.envType] + '/ProfitRestServices/metainfo/';
  }

  /**
   * HTTP function with AFAS authorization
   *
   * @param url {string} http://example.com
   * @param method {string} GET, POST, PUT, DELETE
   * @param body {string} Optional, should be a valid JSON string
   * @param customConfig {RequestInit} default http request config
   */
  protected async http(url: string, method: THttpMethods, body?: string, customConfig?: RequestInit) {
    let config: RequestInit = {
      method,
      headers: {
        Authorization: 'AfasToken ' + Buffer.from(this.apiKey, 'binary').toString('base64')
      }
    };

    if (body) {
      config.body = body;
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
}
