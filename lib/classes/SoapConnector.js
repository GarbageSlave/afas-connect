var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Connector from './Connector.js';
import { ProfitError } from './ProfitError.js';
export default class SoapConnector extends Connector {
    constructor(AfasConfig, auth) {
        super(Object.assign(Object.assign({}, AfasConfig), { type: 'soap' }), auth);
    }
    /**
     * Get data from GetConnector
     * @param getConnectorName {string} example: Profit_Article
     * @param config {ISoapFilterConfig} Filter config
     *
     * @returns { GetDataResult: string }
     */
    get(getConnectorName, config) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.afasUrl}AppConnectorGet.asmx`;
            try {
                const GetDataResult = yield this.execute(url, 'ConnectorAppGet', 'GetData', {
                    connectorId: getConnectorName,
                    filtersXml: (_a = config === null || config === void 0 ? void 0 : config.filtersXml) !== null && _a !== void 0 ? _a : '',
                    skip: (_b = config === null || config === void 0 ? void 0 : config.skip) !== null && _b !== void 0 ? _b : 0,
                    take: (_c = config === null || config === void 0 ? void 0 : config.take) !== null && _c !== void 0 ? _c : 100,
                });
                return { GetDataResult };
            }
            catch (error) {
                throw new ProfitError('An error occured trying to GET ' + getConnectorName, error);
            }
        });
    }
    /**
     *
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {string} A valid AFAS XML string
     *
     * @returns { ExecuteResult: string } for certain UpdateConnectors an XML string containing the new ID, for others an empty string
     */
    update(updateConnectorName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.afasUrl}appconnectorupdate.asmx`;
            try {
                const ExecuteResult = yield this.execute(url, 'ConnectorAppUpdate', 'Execute', {
                    connectorType: updateConnectorName,
                    connectorVersion: 1,
                    dataXml: payload,
                });
                return { ExecuteResult };
            }
            catch (error) {
                throw new ProfitError('An error occured trying to update ' + updateConnectorName, error);
            }
        });
    }
}
