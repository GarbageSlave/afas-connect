import GetConnector from './GetConnector';
import UpdateConnector from './UpdateConnector';
import CustomConnector from './CustomConnector';

import { IAfasConfig } from '../models';

export class Profit {
  private AfasConfig: IAfasConfig;
  public GetConnector: GetConnector;
  public UpdateConnector: UpdateConnector;
  public CustomConnector: CustomConnector;

  constructor(config: IAfasConfig) {
    this.AfasConfig = config;
    this.GetConnector = new GetConnector(config);
    this.UpdateConnector = new UpdateConnector(config);
    this.CustomConnector = new CustomConnector(config);
  }

  public changeConfig(config: IAfasConfig) {
    this.AfasConfig = {...this.AfasConfig, ...config};
  }

  public get config() {
    return { environment: this.AfasConfig.env, environmentType: this.AfasConfig.envType };
  }
}
