import { IAfasConnectorConfig, TAfasRestProfileResponse, THttpMethods } from '../models';
export default abstract class Connector {
    private AfasConfig;
    constructor(AfasConfig: IAfasConnectorConfig);
    private get env();
    private get type();
    private get profitservice();
    private get token();
    private get language();
    protected get afasUrl(): string;
    protected get connectorUrl(): string;
    protected get metainfoUrl(): string;
    protected get insiteUrl(): string;
    protected profileRequest(tokenUrl: string, data: any): Promise<TAfasRestProfileResponse | false>;
    protected OTPRequest(userid: string, apiKey: string, apiToken: string): Promise<boolean>;
    protected OTPValidate(userid: string, apiKey: string, apiToken: string, otp: string): Promise<string | false>;
    /**
     * HTTP function with AFAS authorization
     *
     * @param url {string} http://example.com
     * @param method {string} GET, POST, PUT, DELETE
     * @param body {string} Optional, should be a valid JSON object
     * @param customHeaders {object} Add some custom headers
     */
    protected http(url: string, method: THttpMethods, body?: Record<string, any>, customHeaders?: Record<string, any>): Promise<any>;
    /**
     *
     * @param url {string} WSDL url
     * @param args {object} arguments
     * @param methodname {string} client methodname
     * @returns any
     */
    protected execute(url: string, args: Record<string, any>, methodname: string): Promise<any>;
}
