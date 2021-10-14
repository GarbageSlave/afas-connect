import { IAfasConfig, ISoapFilterConfig } from '../models';
import Connector from './Connector';

export default class SoapConnector extends Connector {
  constructor(AfasConfig: IAfasConfig) {
    super({...AfasConfig, type: 'soap'})
  }

  public async get (getConnectorName: string, config: ISoapFilterConfig) {
    var url = `${this.afasUrl}AppConnectorGet.asmx?WSDL`;
    var args = {
      'connectorId': getConnectorName,
      'filtersXml': config.filtersXml,
      'skip': config.skip,
      'take': config.take
    };
    const result = await this.executeSoap(url, args, 'GetData')
    console.log(result)
  }
}
