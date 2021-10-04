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
const constants_1 = require("../constants");
class Connector {
    constructor(AfasConfig) {
        this._AfasConfig = AfasConfig;
    }
    // Should the env variable contain text, its trimmed and only the numbers are returned
    get env() {
        return this._AfasConfig.env.replace(/[^\d.]/g, '');
    }
    get apiKey() {
        return this._AfasConfig.apiKey;
    }
    get connectorName() {
        return this._AfasConfig.connector;
    }
    get afasUrl() {
        return 'https://' + this.env + '.' + constants_1.default[this._AfasConfig.envType] + '/ProfitRestServices/';
    }
    get connectorUrl() {
        return 'https://' + this.env + '.' + constants_1.default[this._AfasConfig.envType] + '/ProfitRestServices/connectors/';
    }
    get metainfoUrl() {
        return 'https://' + this.env + '.' + constants_1.default[this._AfasConfig.envType] + '/ProfitRestServices/metainfo/';
    }
    /**
     * HTTP function with AFAS authorization
     *
     * @param url {string} http://example.com
     * @param method {string} GET, POST, PUT, DELETE
     * @param body {string} Optional, should be a valid JSON string
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
                config.body = body;
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
}
exports.default = Connector;
