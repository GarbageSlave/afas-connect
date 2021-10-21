import { IAfasConfig, ISoapFilterConfig, TUpdateConnectorName } from '../models';
import Connector from './Connector';
export default class SoapConnector extends Connector {
    constructor(AfasConfig: IAfasConfig);
    /**
     *
     * @param getConnectorName {string} example: Profit_Article
     * @param config {ISoapFilterConfig} Filter config
     *
     * @returns { GetDataResult: "<XML DATA STRING />" }
     */
    get(getConnectorName: string, config?: ISoapFilterConfig): Promise<unknown>;
    /**
     *
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {string} A valid AFAS XML string
     */
    update(updateConnectorName: TUpdateConnectorName, payload: string): Promise<void>;
}
