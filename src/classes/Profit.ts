import GetConnector from './GetConnector';
import UpdateConnector from './UpdateConnector';
import CustomConnector from './CustomConnector';
import SoapConnector from './SoapConnector';
import InsiteConnector from './InsiteConnector';

import { IAfasConfig } from '../models';

export class Profit {
  private _AfasConfig: IAfasConfig;
  public GetConnector: GetConnector;
  public UpdateConnector: UpdateConnector;
  public CustomConnector: CustomConnector;
  public SoapConnector: SoapConnector;
  public InsiteConnector: InsiteConnector;

  constructor(AfasConfig: IAfasConfig) {
    this._AfasConfig = AfasConfig;
    this.GetConnector = new GetConnector(AfasConfig);
    this.UpdateConnector = new UpdateConnector(AfasConfig);
    this.CustomConnector = new CustomConnector(AfasConfig);
    this.SoapConnector = new SoapConnector(AfasConfig);
    this.InsiteConnector = new InsiteConnector(AfasConfig);
  }

  public changeConfig(AfasConfig: IAfasConfig) {
    this._AfasConfig = {...this._AfasConfig, ...AfasConfig};
    this.GetConnector = new GetConnector(this._AfasConfig);
    this.UpdateConnector = new UpdateConnector(this._AfasConfig);
    this.CustomConnector = new CustomConnector(this._AfasConfig);
    this.SoapConnector = new SoapConnector(this._AfasConfig);
    this.InsiteConnector = new InsiteConnector(this._AfasConfig);
  }

  public async metainfo() {
    try {
      return await this.GetConnector.metainfo();
    } catch (error) {
      throw error;      
    }
  }

  public get config() {
    return { environment: this._AfasConfig.env, environmentType: this._AfasConfig.envType };
  }
}
