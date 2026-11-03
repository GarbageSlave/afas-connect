import GetConnector from './GetConnector.js';
import UpdateConnector from './UpdateConnector.js';
import DataConnector from './DataConnector.js';
import SoapConnector from './SoapConnector.js';
import InsiteConnector from './InsiteConnector.js';
import Authentication from './Authentication.js';

import { IAfasConfig } from '../models/index.js';

export class Profit {
  private AfasConfig: IAfasConfig;
  private auth: Authentication;
  public GetConnector: GetConnector;
  public UpdateConnector: UpdateConnector;
  public DataConnector: DataConnector;
  public SoapConnector: SoapConnector;
  public InsiteConnector: InsiteConnector;

  constructor(AfasConfig: IAfasConfig) {
    this.AfasConfig = AfasConfig;
    // One Authentication for all connectors, so they reuse the same access token
    this.auth = new Authentication(AfasConfig);
    this.GetConnector = new GetConnector(AfasConfig, this.auth);
    this.UpdateConnector = new UpdateConnector(AfasConfig, this.auth);
    this.DataConnector = new DataConnector(AfasConfig, this.auth);
    this.SoapConnector = new SoapConnector(AfasConfig, this.auth);
    this.InsiteConnector = new InsiteConnector(AfasConfig, this.auth);
  }

  public changeConfig(AfasConfig: IAfasConfig) {
    // token and oauth are alternatives, so the new config replaces whichever one was used
    const { token, oauth: currentOAuth, ...current } = this.AfasConfig;
    const config: IAfasConfig = { ...current, ...AfasConfig };
    // Keep the current access token when the new config authenticates the same way.
    if (!this.auth.matches(config)) {
      this.auth = new Authentication(config);
    }
    this.AfasConfig = config;
    this.GetConnector = new GetConnector(this.AfasConfig, this.auth);
    this.UpdateConnector = new UpdateConnector(this.AfasConfig, this.auth);
    this.DataConnector = new DataConnector(this.AfasConfig, this.auth);
    this.SoapConnector = new SoapConnector(this.AfasConfig, this.auth);
    this.InsiteConnector = new InsiteConnector(this.AfasConfig, this.auth);
  }

  public async metainfo() {
    try {
      return await this.GetConnector.metainfo();
    } catch (error) {
      throw error;
    }
  }

  public get config() {
    return { environment: this.AfasConfig.env, environmentType: this.AfasConfig.envType };
  }
}
