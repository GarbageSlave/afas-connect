import { IAfasConfig, IFilterConfig, TAfasRestDataResponse } from '../models';
import Connector from './Connector';
export default class GetConnector extends Connector {
    constructor(AfasConfig: IAfasConfig);
    private parseConfig;
    /**
     * Get data from GetConnector
     * @param getConnectorName {string} GetConnector name, example: Profit_Article
     * @param config {IFilterConfig} Filter config
     *
     * @returns Example: { skip: 0, take: 100, rows: [your data] }
     */
    get(getConnectorName: string, config?: IFilterConfig): Promise<TAfasRestDataResponse>;
    /**
     * Get just one row from GetConnector
     * @param getConnectorName {string} GetConnector name, example: Profit_Article
     * @param config {IFilterConfig} Filter config
     *
     * @returns the first entry as an Object. If nothing was found returns Null
     */
    getOne(getConnectorName: string, config?: IFilterConfig): Promise<TAfasRestDataResponse>;
    /**
     * Fetch the metadata of a GetConnector
     * If getConnectorName is left empty, gives the list of all connectors, use Profit.metainfo() then instead
     * @param getConnectorName {string} GetConnector name, example: Profit_Article
     */
    metainfo(getConnectorName?: string): Promise<TAfasRestDataResponse>;
}
