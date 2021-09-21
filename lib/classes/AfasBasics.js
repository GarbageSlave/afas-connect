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
const constants_1 = require("../constants");
class AfasBasics {
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
    get afasUrl() {
        return 'https://' + this.env + '.' + constants_1.default[this._AfasConfig.envType] + '/ProfitRestServices/';
    }
    get connectorUrl() {
        return 'https://' + this.env + '.' + constants_1.default[this._AfasConfig.envType] + '/ProfitRestServices/connectors/';
    }
    get metainfoUrl() {
        return 'https://' + this.env + '.' + constants_1.default[this._AfasConfig.envType] + '/ProfitRestServices/metainfo/get/';
    }
    handleResponse(result) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Response is expected to be JSON
                const response = yield result.json();
                return response;
            }
            catch (error) {
                // Response wasnt valid JSON so go with text
                const response = yield result.text();
                return response;
            }
        });
    }
    /**
     * HTTP function with AFAS authorization
     *
     * @param url {string} http://example.com
     * @param method {string} GET, POST, PUT, DELETE
     * @param body {RequestInit} Optional, should be a valid JSON string
     */
    http(url, method, body, customConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let config = {
                    method,
                    headers: {
                        Authentication: 'AfasToken ' + btoa(this.apiKey),
                        'Content-Type': 'application/json',
                    },
                };
                if (body) {
                    config.body = body;
                }
                if (customConfig) {
                    config = Object.assign(Object.assign({}, config), customConfig);
                }
                const response = yield fetch(url, config);
                const result = yield this.handleResponse(response);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = AfasBasics;
