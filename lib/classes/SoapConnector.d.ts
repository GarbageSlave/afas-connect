import { IAfasConfig, ISoapFilterConfig } from '../models';
import Connector from './Connector';
export default class SoapConnector extends Connector {
    constructor(AfasConfig: IAfasConfig);
    /**
     *
     * @param getConnectorName {string} example: Profit_Article
     * @param config {ISoapFilterConfig} Filter config
     */
    get(getConnectorName: string, config?: ISoapFilterConfig): Promise<void>;
}
