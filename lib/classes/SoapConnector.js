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
class SoapConnector extends Connector_1.default {
    constructor(AfasConfig) {
        super(Object.assign(Object.assign({}, AfasConfig), { type: 'soap' }));
    }
    /**
     *
     * @param getConnectorName {string} example: Profit_Article
     * @param config {ISoapFilterConfig} Filter config
     */
    get(getConnectorName, config) {
        return __awaiter(this, void 0, void 0, function* () {
            var url = `${this.afasUrl}AppConnectorGet.asmx?WSDL`;
            var args = Object.assign({ 'connectorId': getConnectorName }, config);
            const result = yield this.httpSoap(url, args, 'GetData');
            console.log(result);
        });
    }
}
exports.default = SoapConnector;
