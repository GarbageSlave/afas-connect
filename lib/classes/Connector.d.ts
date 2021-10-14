import { RequestInit } from 'node-fetch';
import { IAfasConnectorConfig, THttpMethods } from '../models';
export default abstract class Connector {
    private AfasConfig;
    constructor(AfasConfig: IAfasConnectorConfig);
    private get env();
    private get type();
    private get profitservice();
    private get apiKey();
    protected get afasUrl(): string;
    protected get connectorUrl(): string;
    protected get metainfoUrl(): string;
    /**
     * HTTP function with AFAS authorization
     *
     * @param url {string} http://example.com
     * @param method {string} GET, POST, PUT, DELETE
     * @param body {string} Optional, should be a valid JSON object
     * @param customConfig {RequestInit} default http request config
     */
    protected http(url: string, method: THttpMethods, body?: object, customConfig?: RequestInit): Promise<any>;
    protected executeSoap(url: string, args: object, methodname: string): Promise<unknown>;
}
