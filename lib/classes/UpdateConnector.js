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
class UpdateConnector extends Connector_1.default {
    constructor(AfasConfig) {
        super(AfasConfig);
    }
    // private async createPath(connector: any, values: any) {
    //   const connectorMetaInfo = await this.metainfo(connector);
    //   return this.findId(values, connectorMetaInfo, '/' + connector);
    // }
    // private findId(values: { id: any; value: any }, currentNode: any, path?: any): string | boolean {
    //   // find ID in fields, if not found, go to objects and try to find ID in fields ect.
    //   let i;
    //   let currentChild;
    //   let result;
    //   path = path + `/${currentNode.name}`;
    //   if (currentNode.fields.findIndex((x: any) => x.fieldId === values.id) !== -1) {
    //     path = path + `/${values.id}/${values.value}`;
    //     return path;
    //   } else {
    //     // Use a for loop instead of forEach to avoid nested functions
    //     // Otherwise "return" will not work properly
    //     for (i = 0; i < currentNode.objects.length; i += 1) {
    //       currentChild = currentNode.objects[i];
    //       // Search in the current child
    //       result = this.findId(values.id, currentChild, path);
    //       // Return the result if the node has been found
    //       if (result !== false) {
    //         return result;
    //       }
    //     }
    //     // The node has not been found and we have no more options
    //     return false;
    //   }
    // }
    /**
     * Inserts record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example: "KnAppointment"
     * @param payload {object} valid AFAS JSON string
     */
    insert(updateConnectorName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.connectorUrl + updateConnectorName, 'POST', JSON.stringify(payload));
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Updates record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {object} valid AFAS JSON string
     */
    update(updateConnectorName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.connectorUrl + updateConnectorName, 'PUT', JSON.stringify(payload));
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Deletes record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {object} URL param string, example: /KnAppointment/ApId/11.
     */
    delete(updateConnectorName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.connectorUrl + updateConnectorName + payload, 'DELETE');
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Deletes record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param id {string} example SbId
     * @param idValue {string} example "24"
     */
    // public async delete_EXPERIMENTAL(updateConnectorName: TUpdateConnectorName, id: string, idValue: string) {
    //   try {
    //     const path = this.createPath(updateConnectorName, { id, value: idValue });
    //     if (path) {
    //       return await this.http(this.connectorUrl + updateConnectorName + path, 'DELETE');
    //     } else {
    //       throw new Error('Could not find path');
    //     }
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    /**
     * Inserts sub record, updates main record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param subUpdateConnectorName {string} sub UpdateConnector name, example "KnAppointmentLines"
     * @param payload {object} valid AFAS object
     */
    insertSubUpdateMain(updateConnectorName, subUpdateConnectorName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.connectorUrl + updateConnectorName + '/' + subUpdateConnectorName + updateConnectorName, 'POST', JSON.stringify(payload));
            }
            catch (error) {
                throw error;
            }
        });
    }
    metainfo(updateConnectorName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.metainfoUrl + 'update/' + updateConnectorName, 'GET');
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UpdateConnector;
