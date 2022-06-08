import GetConnector from './GetConnector';
import UpdateConnector from './UpdateConnector';
import DataConnector from './DataConnector';
import SoapConnector from './SoapConnector';
import InsiteConnector from './InsiteConnector';

import { IAfasConfig } from '../models';

export class Profit {
  private _AfasConfig: IAfasConfig;
  public GetConnector: GetConnector;
  public UpdateConnector: UpdateConnector;
  public DataConnector: DataConnector;
  public SoapConnector: SoapConnector;
  public InsiteConnector: InsiteConnector;

  /**
   * @deprecated Please use DataConnector instead
   */
  public CustomConnector: DataConnector;

  constructor(AfasConfig: IAfasConfig) {
    this._AfasConfig = AfasConfig;
    this.GetConnector = new GetConnector(AfasConfig);
    this.UpdateConnector = new UpdateConnector(AfasConfig);
    this.DataConnector = new DataConnector(AfasConfig);
    this.SoapConnector = new SoapConnector(AfasConfig);
    this.InsiteConnector = new InsiteConnector(AfasConfig);

    this.CustomConnector = this.DataConnector;
  }

  public changeConfig(AfasConfig: IAfasConfig) {
    this._AfasConfig = {...this._AfasConfig, ...AfasConfig};
    this.GetConnector = new GetConnector(this._AfasConfig);
    this.UpdateConnector = new UpdateConnector(this._AfasConfig);
    this.DataConnector = new DataConnector(this._AfasConfig);
    this.SoapConnector = new SoapConnector(this._AfasConfig);
    this.InsiteConnector = new InsiteConnector(this._AfasConfig);

    this.CustomConnector = this.DataConnector;
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
