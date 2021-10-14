import { IAfasConfig, ISoapFilterConfig } from '../models';
import Connector from './Connector';
export default class SoapConnector extends Connector {
    constructor(AfasConfig: IAfasConfig);
    get(getConnectorName: string, config: ISoapFilterConfig): Promise<void>;
}
