import { IAfasConfig, ISoapFilterConfig } from '../models';
import Connector from './Connector';

export default class SoapConnector extends Connector {
  constructor(AfasConfig: IAfasConfig) {
    super({...AfasConfig, type: 'soap'})
  }

  /**
   * 
   * @param getConnectorName {string} example: Profit_Article
   * @param config {ISoapFilterConfig} Filter config
   */
  public async get (getConnectorName: string, config?: ISoapFilterConfig) {
    var url = `${this.afasUrl}AppConnectorGet.asmx?WSDL`;
    var args = {
      'connectorId': getConnectorName,
      ...config
    };
    const result = await this.httpSoap(url, args, 'GetData')
    console.log(result)
  }
}
