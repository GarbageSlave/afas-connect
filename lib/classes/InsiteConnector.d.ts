import { IAfasConfig, TAfasRestProfileResponse } from '../models';
import Connector from './Connector';
export default class InsiteConnector extends Connector {
    constructor(AfasConfig: IAfasConfig);
    private formUrlEncoded;
    get url(): string;
    /**
     * Get profile of active user
     *
     * @param tokenUrl {string} The 'tokenUrl' param in URL of an intergration website in Insite
     * @param privateKey {string} Insite private key
     * @param code {string} The 'code' param in URL of an intergration website in Insite
     * @returns {(TAfasRestProfileResponse | false)} Data of currently active AFAS user or false if profile was already fetched once
     */
    profile(privateKey: string, code: string, tokenUrl?: string): Promise<TAfasRestProfileResponse | false>;
    /**
     * Request user specific token
     * An email will be send to the user with a code
     *
     * @param userid {string} userId of user who will request the OTP. Example: 12345.Employee
     * @param apiKey {string} Environment API Key
     * @param apiToken {string} Environment key
     * @returns {(true | false)} true if request was succesful, false if request failed. Note: it will return true even if the keys dont match
     */
    requestOTP(userid: string, apiKey: string, apiToken: string): Promise<boolean>;
    /**
     * Validate otp request and receive token
     *
     * @param userid userId of user who will request the OTP. Example: 12345.Employee
     * @param apiKey Environment API Key
     * @param apiToken Environment key
     * @param otp The code recieved by the user in his email
     * @returns {(string | false)} A string of the token or false, indicating the otp code was invalid
     */
    validateOTP(userid: string, apiKey: string, apiToken: string, otp: string): Promise<string | false>;
}
