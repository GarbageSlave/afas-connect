import { IAfasConfig, ISoapFilterConfig, TUpdateConnectorName } from '../models/index.js';
import Connector from './Connector.js';
import Authentication from './Authentication.js';
export default class SoapConnector extends Connector {
    constructor(AfasConfig: IAfasConfig, auth: Authentication);
    /**
     * Get data from GetConnector
     * @param getConnectorName {string} example: Profit_Article
     * @param config {ISoapFilterConfig} Filter config
     *
     * @returns { GetDataResult: string }
     */
    get(getConnectorName: string, config?: ISoapFilterConfig): Promise<{
        GetDataResult: string;
    }>;
    /**
     *
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {string} A valid AFAS XML string
     *
     * @returns { ExecuteResult: string } for certain UpdateConnectors an XML string containing the new ID, for others an empty string
     */
    update(updateConnectorName: TUpdateConnectorName, payload: string): Promise<{
        ExecuteResult: string;
    }>;
}
