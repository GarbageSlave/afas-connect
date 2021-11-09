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
     * Get data from GetConnector
     * @param getConnectorName {string} example: Profit_Article
     * @param config {ISoapFilterConfig} Filter config
     *
     * @returns { GetDataResult: string }
     */
    get(getConnectorName, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.afasUrl}AppConnectorGet.asmx?WSDL`;
            const args = Object.assign({ 'connectorId': getConnectorName, 'skip': 0, 'take': 100, 'filtersXml': '' }, config);
            return yield this.execute(url, args, 'GetData');
        });
    }
    /**
     *
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {string} A valid AFAS XML string
     *
     * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
     */
    update(updateConnectorName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.afasUrl}appconnectorupdate.asmx?WSDL`;
            const args = {
                'connectorType': updateConnectorName,
                'connectorVersion': 1,
                'dataXml': payload
            };
            yield this.execute(url, args, 'Execute');
        });
    }
}
exports.default = SoapConnector;
