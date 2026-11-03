import { IAfasConfig, ISoapFilterConfig, TUpdateConnectorName } from '../models/index.js';
import Connector from './Connector.js';
import Authentication from './Authentication.js';
import { ProfitError } from './ProfitError.js';

export default class SoapConnector extends Connector {
  constructor(AfasConfig: IAfasConfig, auth: Authentication) {
    super({ ...AfasConfig, type: 'soap' }, auth);
  }

  /**
   * Get data from GetConnector
   * @param getConnectorName {string} example: Profit_Article
   * @param config {ISoapFilterConfig} Filter config
   *
   * @returns { GetDataResult: string }
   */
  public async get(getConnectorName: string, config?: ISoapFilterConfig): Promise<{ GetDataResult: string }> {
    const url = `${this.afasUrl}AppConnectorGet.asmx`;
    try {
      const GetDataResult = await this.execute(url, 'ConnectorAppGet', 'GetData', {
        connectorId: getConnectorName,
        filtersXml: config?.filtersXml ?? '',
        skip: config?.skip ?? 0,
        take: config?.take ?? 100,
      });
      return { GetDataResult };
    } catch (error: any) {
      throw new ProfitError('An error occured trying to GET ' + getConnectorName, error);
    }
  }

  /**
   *
   * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
   * @param payload {string} A valid AFAS XML string
   *
   * @returns { ExecuteResult: string } for certain UpdateConnectors an XML string containing the new ID, for others an empty string
   */
  public async update(updateConnectorName: TUpdateConnectorName, payload: string): Promise<{ ExecuteResult: string }> {
    const url = `${this.afasUrl}appconnectorupdate.asmx`;
    try {
      const ExecuteResult = await this.execute(url, 'ConnectorAppUpdate', 'Execute', {
        connectorType: updateConnectorName,
        connectorVersion: 1,
        dataXml: payload,
      });
      return { ExecuteResult };
    } catch (error: any) {
      throw new ProfitError('An error occured trying to update ' + updateConnectorName, error);
    }
  }
}
