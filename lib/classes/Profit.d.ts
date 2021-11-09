import GetConnector from './GetConnector';
import UpdateConnector from './UpdateConnector';
import CustomConnector from './CustomConnector';
import SoapConnector from './SoapConnector';
import InsiteConnector from './InsiteConnector';
import { IAfasConfig } from '../models';
export declare class Profit {
    private AfasConfig;
    GetConnector: GetConnector;
    UpdateConnector: UpdateConnector;
    CustomConnector: CustomConnector;
    SoapConnector: SoapConnector;
    InsiteConnector: InsiteConnector;
    constructor(AfasConfig: IAfasConfig);
    changeConfig(AfasConfig: IAfasConfig): void;
    get config(): {
        environment: string;
        environmentType: "production" | "test" | "accept";
    };
}
