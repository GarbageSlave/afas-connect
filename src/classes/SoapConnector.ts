import { IAfasConfig, ISoapFilterConfig, TUpdateConnectorName } from '../models';
import Connector from './Connector';

export default class SoapConnector extends Connector {
  constructor(AfasConfig: IAfasConfig) {
    super({...AfasConfig, type: 'soap'})
  }

  /**
   * Get data from GetConnector
   * @param getConnectorName {string} example: Profit_Article
   * @param config {ISoapFilterConfig} Filter config
   * 
   * @returns { GetDataResult: "<XML DATA STRING />" }
   */
  public async get (getConnectorName: string, config?: ISoapFilterConfig) {
    const url = `${this.afasUrl}AppConnectorGet.asmx?WSDL`;
    const args = {
      'connectorId': getConnectorName,
      'skip': 0,
      'take': 100,
      'filtersXml': '',
      ...config
    };
    return await this.execute(url, args, 'GetData')
  }

  /**
   * 
   * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
   * @param payload {string} A valid AFAS XML string
   * 
   * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
   */
  public async update (updateConnectorName: TUpdateConnectorName, payload: string) {
    const url = `${this.afasUrl}appconnectorupdate.asmx?WSDL`;
    const args = {
      'connectorType': updateConnectorName,
      'connectorVersion': 1,
      'dataXml': payload
    };
    await this.execute(url, args, 'Execute')
  }
}
