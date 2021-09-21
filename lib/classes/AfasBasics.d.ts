import { IAfasConfig, THttpMethods } from '../models';
export default class AfasBasics {
    private _AfasConfig;
    constructor(AfasConfig: IAfasConfig);
    private get env();
    private get apiKey();
    protected get afasUrl(): string;
    protected get connectorUrl(): string;
    protected get metainfoUrl(): string;
    protected handleResponse(result: any): Promise<any>;
    /**
     * HTTP function with AFAS authorization
     *
     * @param url {string} http://example.com
     * @param method {string} GET, POST, PUT, DELETE
     * @param body {RequestInit} Optional, should be a valid JSON string
     */
    http(url: string, method: THttpMethods, body?: string, customConfig?: RequestInit): Promise<any>;
}
