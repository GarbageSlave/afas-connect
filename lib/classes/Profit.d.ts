import GetConnector from './GetConnector';
import UpdateConnector from './UpdateConnector';
import CustomConnector from './CustomConnector';
import SoapConnector from './SoapConnector';
import InsiteConnector from './InsiteConnector';
import { IAfasConfig } from '../models';
export declare class Profit {
    private _AfasConfig;
    GetConnector: GetConnector;
    UpdateConnector: UpdateConnector;
    CustomConnector: CustomConnector;
    SoapConnector: SoapConnector;
    InsiteConnector: InsiteConnector;
    constructor(AfasConfig: IAfasConfig);
    changeConfig(AfasConfig: IAfasConfig): void;
    metainfo(): Promise<import("../models").TAfasRestDataResponse>;
    get config(): {
        environment: string;
        environmentType: "production" | "test" | "accept";
    };
}
