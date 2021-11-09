import { IAfasConfig, ISoapFilterConfig, TUpdateConnectorName } from '../models';
import Connector from './Connector';
export default class SoapConnector extends Connector {
    constructor(AfasConfig: IAfasConfig);
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
     * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
     */
    update(updateConnectorName: TUpdateConnectorName, payload: string): Promise<any>;
}
