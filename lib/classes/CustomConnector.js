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
class GetConnector extends Connector_1.default {
    constructor(AfasConfig) {
        super(AfasConfig);
    }
    /**
     * @returns Profit version
     */
    version() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.afasUrl + 'profitversion', 'GET');
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Gets a file from AFAS
     * @param fileId {string} ID of a file in AFAS
     * @param fileName {string} Filename of a file in AFAS
     */
    file(fileId, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.afasUrl + 'fileconnector/' + encodeURI(fileId) + '/' + encodeURI(fileName), 'GET');
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Gets an image from AFAS
     * @param format 0: original, 1: thumbnail, 2: medium, sets image format
     * @param imageId {string} ID of image in AFAS
     */
    image(format, imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.afasUrl + 'imageconnector/' + imageId + '?format=' + format, 'GET');
            }
            catch (error) {
                throw error;
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
                return yield this.http(this.afasUrl + 'subjectconnector/' + encodeURI(subjectId) + '/' + encodeURI(fileId), 'GET');
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     *
     * @param reportId {string} ID of report in AFAS
     * @param additionalFilter {string} filters could be: /parsetid/paramid,paramid,../value,value,.. or
     *                                           ?filterfieldids=fieldid,fieldid&filtervalues=value,value&operatortypes=type,type or
     *                                           ?filterjson=json
     */
    report(reportId, additionalFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.afasUrl + 'reportconnector/' + encodeURI(reportId) + additionalFilter, 'GET');
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = GetConnector;
