import { IAfasConnectorConfig, IFilterConfig } from '../models';
import Connector from './Connector';
export default class GetConnector extends Connector {
    constructor(AfasConfig: IAfasConnectorConfig);
    private parseConfig;
    /**
     * Gets data from the GetConnector
     * @param getConnectorName {string} GetConnector name, example: Profit_Article
     *
     * @returns { skip: number, take: number, rows: object[] }
     */
    get(getConnectorName: string, config?: IFilterConfig): Promise<any>;
    metainfo(getConnectorName: string): Promise<any>;
}
