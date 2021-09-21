import GetConnector from './GetConnector';
import UpdateConnector from './UpdateConnector';
import CustomConnector from './CustomConnector';

import { IAfasConfig } from '../models';

export class Profit {
  private AfasConfig: IAfasConfig;

  constructor(config: IAfasConfig) {
    this.AfasConfig = config;
  }

  /**
   * Returns a GetConnector class object
   * @return {GetConnector}
   */
  public get GetConnector() {
    return new GetConnector(this.AfasConfig);
  }

  /**
   * Returns a UpdateConnector class object
   * @return {UpdateConnector}
   */
  public get UpdateConnector() {
    return new UpdateConnector(this.AfasConfig);
  }

  /**
   * Returns a CustomConnector class object
   * @return {CustomConnector}
   */
  public get CustomConnector() {
    return new CustomConnector(this.AfasConfig);
  }

  public changeConfig(config: IAfasConfig) {
    this.AfasConfig = {...this.AfasConfig, ...config};
  }

  public get config() {
    return { environment: this.AfasConfig.env, environmentType: this.AfasConfig.envType };
  }
}
