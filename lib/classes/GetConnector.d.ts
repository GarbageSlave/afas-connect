import { IAfasConfig, IFilterConfig, TAfasRestDataResponse } from '../models';
import Connector from './Connector';
export default class GetConnector extends Connector {
    constructor(AfasConfig: IAfasConfig);
    private parseConfig;
    /**
     * Get data from GetConnector
     * @param getConnectorName {string} GetConnector name, example: Profit_Article
     * @param config {IFilterConfig} Filter config
     */
    get(getConnectorName: string, config?: IFilterConfig): Promise<TAfasRestDataResponse>;
    /**
     * Fetch the metadata of a GetConnector
     * @param getConnectorName {string} GetConnector name, example: Profit_Article
     */
    metainfo(getConnectorName: string): Promise<TAfasRestDataResponse>;
}
