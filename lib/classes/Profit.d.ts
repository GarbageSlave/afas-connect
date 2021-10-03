import GetConnector from './GetConnector';
import UpdateConnector from './UpdateConnector';
import CustomConnector from './CustomConnector';
import { IAfasConfig } from '../models';
export declare class Profit {
    private AfasConfig;
    GetConnector: GetConnector;
    UpdateConnector: UpdateConnector;
    CustomConnector: CustomConnector;
    constructor(config: IAfasConfig);
    changeConfig(config: IAfasConfig): void;
    get config(): {
        environment: string;
        environmentType: "production" | "test" | "accept";
    };
}
