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
    get apiKey() {
        return this.AfasConfig.apiKey;
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
            let config = {
                method,
                headers: {
                    Authorization: 'AfasToken ' + Buffer.from(this.apiKey).toString('base64')
                }
            };
            if (body) {
                config.body = JSON.stringify(body);
            }
            if (customConfig) {
                config = Object.assign(Object.assign({}, config), customConfig);
            }
            const response = yield node_fetch_1.default(url, config);
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    return response.json();
                }
                else {
                    return response.text();
                }
            }
            else {
                switch (response.status) {
                    case 401:
                        throw new Error('Invalid AFAS credentials');
                    case 404:
                        throw new Error('Connector does not exist');
                    case 500:
                        throw new Error('Internal server error');
                    default:
                        throw new Error(`Unknown error occured: ${response.statusText}`);
                }
            }
        });
    }
    httpSoap(url, args, methodname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield soap.createClientAsync(url);
                return yield new Promise((resolve, reject) => {
                    client[methodname](Object.assign(Object.assign({}, args), { 'token': this.apiKey }), (err, result) => {
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
