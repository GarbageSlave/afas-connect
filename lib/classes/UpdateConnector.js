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
const ProfitError_1 = require("./ProfitError");
class UpdateConnector extends Connector_1.default {
    constructor(AfasConfig) {
        super(Object.assign(Object.assign({}, AfasConfig), { type: 'rest' }));
    }
    /**
     * Inserts a record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example: "KnAppointment"
     * @param payload {object} valid AFAS JSON payload
     *
     * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
     */
    insert(updateConnectorName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.connectorUrl + updateConnectorName, 'POST', payload);
            }
            catch (error) {
                throw new ProfitError_1.ProfitError('An error occured trying to insert ' + updateConnectorName, error);
            }
        });
    }
    /**
     * Updates a record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {object} valid AFAS JSON payload
     *
     * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
     */
    update(updateConnectorName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.connectorUrl + updateConnectorName, 'PUT', payload);
            }
            catch (error) {
                throw new ProfitError_1.ProfitError('An error occured trying to update ' + updateConnectorName, error);
            }
        });
    }
    /**
     * Deletes a record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {string} URL param string, example: /KnAppointment/ApId/11.
     *
     * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
     */
    delete(updateConnectorName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.connectorUrl + updateConnectorName + payload, 'DELETE');
            }
            catch (error) {
                throw new ProfitError_1.ProfitError('An error occured trying to delete ' + updateConnectorName, error);
            }
        });
    }
    /**
     * Inserts sub record, updates main record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param subUpdateConnectorName {string} sub UpdateConnector name, example "KnAppointmentLines"
     * @param payload {object} valid AFAS JSON payload
     *
     * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
     */
    insertSubUpdateMain(updateConnectorName, subUpdateConnectorName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.connectorUrl + updateConnectorName + '/' + subUpdateConnectorName, 'POST', payload);
            }
            catch (error) {
                throw new ProfitError_1.ProfitError('An error occured trying to insert and update ' + updateConnectorName, error);
            }
        });
    }
    /**
     * Fetch the metadata of an UpdateConnector
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     *
     * @returns { skip: number, take: number, rows: object[] }
     */
    metainfo(updateConnectorName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.metainfoUrl + 'update/' + updateConnectorName, 'GET');
            }
            catch (error) {
                throw new ProfitError_1.ProfitError('An error occured trying to get Metainfo of ' + updateConnectorName, error);
            }
        });
    }
}
exports.default = UpdateConnector;
