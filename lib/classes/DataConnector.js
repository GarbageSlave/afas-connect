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
class DataConnector extends Connector_1.default {
    constructor(AfasConfig) {
        super(Object.assign(Object.assign({}, AfasConfig), { type: 'rest' }));
    }
    /**
     * Gets current profit version
     */
    version() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.afasUrl + 'profitversion', 'GET');
            }
            catch (error) {
                throw new ProfitError_1.ProfitError('An error occured trying to get the AFAS version', error);
            }
        });
    }
    /**
     * Gets a file from AFAS
     * @param fileId {string} ID of a file in AFAS
     * @param fileName {string} Filename of a file in AFAS
     * @param binary {boolean} If true, will return the file in binary instead of { filedata, mimetype }
     *
     */
    file(fileId, fileName, binary = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.afasUrl + 'fileconnector/' + encodeURIComponent(fileId) + '/' + encodeURIComponent(fileName), 'GET', undefined, { SendFileAsBinary: binary ? "1" : "0" });
            }
            catch (error) {
                throw new ProfitError_1.ProfitError('An error occured trying to get a file', error);
            }
        });
    }
    /**
     * Gets an image from AFAS
     * @param format 0: original, 1: thumbnail, 2: medium, sets image format
     * @param imageId {string} ID of image in AFAS
     * @param binary {boolean} If true, will return the file in binary instead of { filedata, mimetype }
     *
     */
    image(format, imageId, binary = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.afasUrl + 'imageconnector/' + imageId + '?format=' + format, 'GET', undefined, { SendFileAsBinary: binary ? "1" : "0" });
            }
            catch (error) {
                throw new ProfitError_1.ProfitError('An error occured trying get an image', error);
            }
        });
    }
    /**
     * Gets a subject from AFAS
     * @param subjectId {string} ID of subject in AFAS
     * @param fileId {string} ID of file in AFAS
     */
    subject(subjectId, fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.afasUrl + 'subjectconnector/' + encodeURIComponent(subjectId) + '/' + encodeURIComponent(fileId), 'GET');
            }
            catch (error) {
                throw new ProfitError_1.ProfitError('An error occured trying to get a subject', error);
            }
        });
    }
    /**
     * Gets report from AFAS
     * @param reportId {string} ID of report in AFAS
     * @param additionalFilter {string} filters could be: /parsetid/paramid,paramid,../value,value,.. or ?filterfieldids=fieldid,fieldid&filtervalues=value,value&operatortypes=type,type or ?filterjson=json
     * @param binary {boolean} If true, will return the file in binary instead of { filedata, mimetype }
     */
    report(reportId, additionalFilter, binary = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.afasUrl + 'reportconnector/' + encodeURIComponent(reportId) + additionalFilter, 'GET', undefined, { SendFileAsBinary: binary ? "1" : "0" });
            }
            catch (error) {
                throw new ProfitError_1.ProfitError('An error occured trying to get a report', error);
            }
        });
    }
}
exports.default = DataConnector;
