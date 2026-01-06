import GetConnector from './GetConnector.js';
import UpdateConnector from './UpdateConnector.js';
import DataConnector from './DataConnector.js';
import SoapConnector from './SoapConnector.js';
import InsiteConnector from './InsiteConnector.js';
import { IAfasConfig } from '../models/index.js';
export declare class Profit {
    private _AfasConfig;
    GetConnector: GetConnector;
    UpdateConnector: UpdateConnector;
    DataConnector: DataConnector;
    SoapConnector: SoapConnector;
    InsiteConnector: InsiteConnector;
    /**
     * @deprecated Please use DataConnector instead
     */
    CustomConnector: DataConnector;
    constructor(AfasConfig: IAfasConfig);
    changeConfig(AfasConfig: IAfasConfig): void;
    metainfo(): Promise<import("../models/index.js").TAfasRestDataResponse>;
    get config(): {
        environment: string;
        environmentType: ("production" | "test" | "accept") | import("../models/index.js").EnvTypes;
    };
}
