import GetConnector from './GetConnector';
import UpdateConnector from './UpdateConnector';
import CustomConnector from './CustomConnector';
import { IAfasConfig } from '../models';
export declare class Profit {
    private AfasConfig;
    constructor(config: IAfasConfig);
    /**
     * Returns a GetConnector class object
     * @return {GetConnector}
     */
    get GetConnector(): GetConnector;
    /**
     * Returns a UpdateConnector class object
     * @return {UpdateConnector}
     */
    get UpdateConnector(): UpdateConnector;
    /**
     * Returns a CustomConnector class object
     * @return {CustomConnector}
     */
    get CustomConnector(): CustomConnector;
    changeConfig(config: IAfasConfig): void;
    get config(): {
        environment: string;
        environmentType: "production" | "test" | "accept";
    };
}
