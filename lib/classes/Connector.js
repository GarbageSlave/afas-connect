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
const node_fetch_1 = require("node-fetch");
const soap = require("soap");
const constants_1 = require("../constants");
class Connector {
    constructor(AfasConfig) {
        this.AfasConfig = AfasConfig;
    }
    // Should the env variable contain text, its trimmed and only the numbers are returned
    get env() {
        return this.AfasConfig.env.replace(/[^\d.]/g, '');
    }
    get type() {
        return this.AfasConfig.type ? this.AfasConfig.type : 'rest';
    }
    get profitservice() {
        return this.type === 'rest' ? 'ProfitRestServices' : 'ProfitServices';
    }
    get token() {
        return this.AfasConfig.token;
    }
    get afasUrl() {
        return 'https://' + this.env + '.' + constants_1.endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/`;
    }
    get connectorUrl() {
        return 'https://' + this.env + '.' + constants_1.endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/connectors/`;
    }
    get metainfoUrl() {
        return 'https://' + this.env + '.' + constants_1.endpoints[this.type][this.AfasConfig.envType] + `/${this.profitservice}/metainfo/`;
    }
    get insiteUrl() {
        return 'https://' + this.env + '.afasinsite.nl';
    }
    profileRequest(tokenUrl, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield node_fetch_1.default(tokenUrl, {
                method: "POST",
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.ok) {
                return yield response.json();
            }
            else {
                return false;
            }
        });
    }
    OTPRequest(userid, apiKey, apiToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.afasUrl + 'otprequest';
            const data = {
                userid,
                apiKey,
                apiToken
            };
            const response = yield node_fetch_1.default(url, { method: "POST", body: JSON.stringify(data) });
            if (response.ok) {
                // Reponse is 201 even if the apiKey and apiToken do not match
                return true;
            }
            else {
                return false;
            }
        });
    }
    OTPValidate(userid, apiKey, apiToken, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.afasUrl + 'otpvalidation';
            const data = {
                userid,
                apiKey,
                apiToken,
                otp
            };
            const response = yield node_fetch_1.default(url, { method: "POST", body: JSON.stringify(data) });
            if (response.ok) {
                const body = yield response.json();
                return body.token;
            }
            else {
                return false;
            }
        });
    }
    /**
     * HTTP function with AFAS authorization
     *
     * @param url {string} http://example.com
     * @param method {string} GET, POST, PUT, DELETE
     * @param body {string} Optional, should be a valid JSON object
     * @param customConfig {RequestInit} default http request config
     */
    http(url, method, body, customConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let config = {
                    method,
                    headers: {
                        Authorization: 'AfasToken ' + Buffer.from(this.token).toString('base64')
                    }
                };
                if (body) {
                    config.body = JSON.stringify(body);
                }
                if (customConfig) {
                    config = Object.assign(Object.assign({}, config), customConfig);
                }
                const response = yield node_fetch_1.default(url, config);
                const rawBody = yield response.text();
                if (response.ok) {
                    try {
                        return JSON.parse(rawBody);
                    }
                    catch (error) {
                        return rawBody;
                    }
                }
                else {
                    throw rawBody;
                }
            }
            catch (error) {
                throw JSON.parse(error);
            }
        });
    }
    /**
     *
     * @param url {string} WSDL url
     * @param args {object} arguments
     * @param methodname {string} client methodname
     * @returns any
     */
    execute(url, args, methodname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield soap.createClientAsync(url);
                return yield new Promise((resolve, reject) => {
                    client[methodname](Object.assign(Object.assign({}, args), { 'token': this.token }), (err, result) => {
                        if (err)
                            reject(err);
                        resolve(result);
                    });
                });
            }
            catch (error) {
                if (error.body) {
                    throw new Error(error.body);
                }
                else {
                    throw new Error(error);
                }
            }
        });
    }
}
exports.default = Connector;
