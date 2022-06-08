import GetConnector from './GetConnector';
import UpdateConnector from './UpdateConnector';
import DataConnector from './DataConnector';
import SoapConnector from './SoapConnector';
import InsiteConnector from './InsiteConnector';
import { IAfasConfig } from '../models';
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
    metainfo(): Promise<import("../models").TAfasRestDataResponse>;
    get config(): {
        environment: string;
        environmentType: "production" | "test" | "accept" | import("../models").EnvTypes;
    };
}
