import { IAfasConfig, IAfasConnectorConfig, THttpMethods } from '../models';
import { RequestInit } from 'node-fetch';
export default abstract class Connector {
    private _AfasConfig;
    constructor(AfasConfig: IAfasConnectorConfig | IAfasConfig);
    private get env();
    private get apiKey();
    protected get connectorName(): string | undefined;
    protected get afasUrl(): string;
    protected get connectorUrl(): string;
    protected get metainfoUrl(): string;
    /**
     * HTTP function with AFAS authorization
     *
     * @param url {string} http://example.com
     * @param method {string} GET, POST, PUT, DELETE
     * @param body {string} Optional, should be a valid JSON string
     * @param customConfig {RequestInit} default http request config
     */
    protected http(url: string, method: THttpMethods, body?: string, customConfig?: RequestInit): Promise<any>;
}
