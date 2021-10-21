import { IAfasConfig, IFilterConfig } from '../models';
import Connector from './Connector';
export default class GetConnector extends Connector {
    constructor(AfasConfig: IAfasConfig);
    private parseConfig;
    /**
     * Gets data from the GetConnector
     * @param getConnectorName {string} GetConnector name, example: Profit_Article
     * @param config {IFilterConfig} Filter config
     *
     * @returns { skip: number, take: number, rows: object[] }
     */
    get(getConnectorName: string, config?: IFilterConfig): Promise<any>;
    metainfo(getConnectorName: string): Promise<any>;
}
