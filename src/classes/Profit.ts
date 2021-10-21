import GetConnector from './GetConnector';
import UpdateConnector from './UpdateConnector';
import CustomConnector from './CustomConnector';
import SoapConnector from './SoapConnector';

import { IAfasConfig } from '../models';

export class Profit {
  private AfasConfig: IAfasConfig;
  public GetConnector: GetConnector;
  public UpdateConnector: UpdateConnector;
  public CustomConnector: CustomConnector;
  public SoapConnector: SoapConnector;

  constructor(AfasConfig: IAfasConfig) {
    this.AfasConfig = AfasConfig;
    this.GetConnector = new GetConnector(AfasConfig);
    this.UpdateConnector = new UpdateConnector(AfasConfig);
    this.CustomConnector = new CustomConnector(AfasConfig);
    this.SoapConnector = new SoapConnector(AfasConfig);
  }

  public changeConfig(AfasConfig: IAfasConfig) {
    this.AfasConfig = {...this.AfasConfig, ...AfasConfig};
  }

  public get config() {
    return { environment: this.AfasConfig.env, environmentType: this.AfasConfig.envType };
  }
}
