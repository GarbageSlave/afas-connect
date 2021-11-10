"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Connector_1 = require("./Connector");
class InsiteConnector extends Connector_1.default {
    constructor(AfasConfig) {
        super(Object.assign(Object.assign({}, AfasConfig), { type: 'rest' }));
    }
    formUrlEncoded(x) {
        return Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
    }
    get url() {
        return this.insiteUrl;
    }
    /**
     * Get profile of active user
     *
     * @param tokenUrl {string} The 'tokenUrl' param in URL of an intergration website in Insite
     * @param privateKey {string} Insite private key
     * @param code {string} The 'code' param in URL of an intergration website in Insite
     * @returns {(TAfasRestProfileResponse | false)} Data of currently active AFAS user or false if profile was already fetched once
     */
    profile(privateKey, code, tokenUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profileRequest(tokenUrl || this.insiteUrl + '/integrationtoken', this.formUrlEncoded({ secret: privateKey, code }));
        });
    }
    /**
     * Request user specific token
     * An email will be send to the user with a code
     *
     * @param userid {string} userId of user who will request the OTP. Example: 12345.Employee
     * @param apiKey {string} Environment API Key
     * @param apiToken {string} Environment key
     * @returns {(true | false)} true if request was succesful, false if request failed. Note: it will return true even if the keys dont match
     */
    requestOTP(userid, apiKey, apiToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.OTPRequest(userid, apiKey, apiToken);
        });
    }
    /**
     * Validate otp request and receive token
     *
     * @param userid userId of user who will request the OTP. Example: 12345.Employee
     * @param apiKey Environment API Key
     * @param apiToken Environment key
     * @param otp The code recieved by the user in his email
     * @returns {(string | false)} A string of the token or false, indicating the otp code was invalid
     */
    validateOTP(userid, apiKey, apiToken, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.OTPValidate(userid, apiKey, apiToken, otp);
        });
    }
}
exports.default = InsiteConnector;
