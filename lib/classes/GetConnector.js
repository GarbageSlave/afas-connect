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
        super(Object.assign(Object.assign({}, AfasConfig), { type: 'rest' }));
    }
    parseConfig(config) {
        var _a, _b, _c;
        try {
            let result = '';
            // check if there are keys in the config
            if (Object.keys(config || {}).length) {
                // If there are, initiate the string with a ? to start adding queries
                result = '?';
                // set skip query
                if (config.skip) {
                    result += 'skip=' + config.skip + '&';
                }
                // set take query
                if (config.take) {
                    result += 'take=' + config.take + '&';
                }
                // Sort on field query
                if ((_a = config.orderby) === null || _a === void 0 ? void 0 : _a.length) {
                    let sortResult = 'orderbyfieldids=';
                    for (const el of config.orderby) {
                        if (el.order === 'DESC') {
                            sortResult += '-' + el.fieldId + '&';
                        }
                        else {
                            sortResult += el.fieldId + '&';
                        }
                    }
                    result = result + sortResult;
                }
                // filter query
                if ((_b = config.filter) === null || _b === void 0 ? void 0 : _b.length) {
                    let filterfieldidsResult = '';
                    let filtervaluesResult = '';
                    let operatortypesResult = '';
                    const orDepth = [];
                    for (const [i, filter] of config.filter.entries()) {
                        const comma = (i < config.filter.length - 1) ? ',' : '';
                        filterfieldidsResult += filter.filterfieldid + comma;
                        filtervaluesResult += filter.filtervalue + comma;
                        operatortypesResult += filter.operatortype + comma;
                        if ((_c = filter.or) === null || _c === void 0 ? void 0 : _c.length) {
                            for (const [iJ, orFilter] of filter.or.entries()) {
                                if (!(orDepth[iJ] instanceof Array)) {
                                    orDepth[iJ] = [];
                                }
                                orDepth[iJ].push(Object.assign(Object.assign({}, orFilter), { id: filter.filterfieldid }));
                            }
                        }
                    }
                    // handle ORs
                    if (orDepth.length) {
                        for (const or of orDepth) {
                            filterfieldidsResult += ';';
                            filtervaluesResult += ';';
                            operatortypesResult += ';';
                            for (let iJ = 0; iJ < or.length; iJ++) {
                                const filter = or[iJ];
                                const comma = (iJ < or.length - 1) ? ',' : '';
                                filterfieldidsResult += filter.id + comma;
                                filtervaluesResult += filter.filtervalue + comma;
                                operatortypesResult += filter.operatortype + comma;
                            }
                        }
                    }
                    result += `filterfieldids=${filterfieldidsResult}&filtervalues=${filtervaluesResult}&operatortypes=${operatortypesResult}`;
                }
                // JSONfilter query
                // check if the property exists
                if (Object.keys(config.jsonFilter || {}).length) {
                    result = result + 'filterjson=' + encodeURI(JSON.stringify(config.jsonFilter));
                }
            }
            return encodeURI(result);
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get data from GetConnector
     * @param getConnectorName {string} GetConnector name, example: Profit_Article
     * @param config {IFilterConfig} Filter config
     *
     * @returns Example: { skip: 0, take: 100, rows: [your data] }
     */
    get(getConnectorName, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.connectorUrl + getConnectorName + this.parseConfig(config || {}), 'GET');
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
   * Get just one row from GetConnector
   * @param getConnectorName {string} GetConnector name, example: Profit_Article
   * @param config {IFilterConfig} Filter config
   *
   * @returns the first entry as an Object. If nothing was found returns Null
   */
    getOne(getConnectorName, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.http(this.connectorUrl + getConnectorName + this.parseConfig(Object.assign(Object.assign({}, config), { skip: 0, take: 1 }) || {}), 'GET');
                return response.rows[0] || null;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Fetch the metadata of a GetConnector
     * @param getConnectorName {string} GetConnector name, example: Profit_Article
     */
    metainfo(getConnectorName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http(this.metainfoUrl + 'get/' + getConnectorName, 'GET');
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = GetConnector;
