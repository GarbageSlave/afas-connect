import { IAfasConfig } from '../models/index.js';
export default class Authentication {
    private token?;
    private oauth?;
    private tokenUrl;
    private accessToken?;
    private pending?;
    constructor(AfasConfig: IAfasConfig);
    get envelopeToken(): string | undefined;
    matches(AfasConfig: IAfasConfig): boolean;
    private requestAccessToken;
    private oauthToken;
    private header;
    fetch(url: string, init: {
        method: string;
        headers: Record<string, string>;
        body?: string;
    }): Promise<Response>;
}
