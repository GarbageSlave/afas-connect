import { IAfasConnectorConfig, TAfasRestProfileResponse, THttpMethods } from '../models/index.js';
import Authentication from './Authentication.js';
export default abstract class Connector {
    private AfasConfig;
    private auth;
    constructor(AfasConfig: IAfasConnectorConfig, auth: Authentication);
    private get env();
    private get type();
    private get profitservice();
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
     * SOAP request with AFAS token
     *
     * @param url {string} Service url, example: https://12345.soap.afas.online/ProfitServices/AppConnectorGet.asmx
     * @param service {string} Service name from the WSDL, example: ConnectorAppGet
     * @param operation {string} Operation name from the WSDL, example: GetData
     * @param args {object} Arguments in the order the WSDL defines them, a classic token is added as the first argument
     * @returns {string} Decoded content of the <operation>Result element
     */
    protected execute(url: string, service: string, operation: string, args: Record<string, string | number>): Promise<string>;
}
