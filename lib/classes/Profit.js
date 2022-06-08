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
exports.Profit = void 0;
const GetConnector_1 = require("./GetConnector");
const UpdateConnector_1 = require("./UpdateConnector");
const DataConnector_1 = require("./DataConnector");
const SoapConnector_1 = require("./SoapConnector");
const InsiteConnector_1 = require("./InsiteConnector");
class Profit {
    constructor(AfasConfig) {
        this._AfasConfig = AfasConfig;
        this.GetConnector = new GetConnector_1.default(AfasConfig);
        this.UpdateConnector = new UpdateConnector_1.default(AfasConfig);
        this.DataConnector = new DataConnector_1.default(AfasConfig);
        this.SoapConnector = new SoapConnector_1.default(AfasConfig);
        this.InsiteConnector = new InsiteConnector_1.default(AfasConfig);
        this.CustomConnector = this.DataConnector;
    }
    changeConfig(AfasConfig) {
        this._AfasConfig = Object.assign(Object.assign({}, this._AfasConfig), AfasConfig);
        this.GetConnector = new GetConnector_1.default(this._AfasConfig);
        this.UpdateConnector = new UpdateConnector_1.default(this._AfasConfig);
        this.DataConnector = new DataConnector_1.default(this._AfasConfig);
        this.SoapConnector = new SoapConnector_1.default(this._AfasConfig);
        this.InsiteConnector = new InsiteConnector_1.default(this._AfasConfig);
        this.CustomConnector = this.DataConnector;
    }
    metainfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.GetConnector.metainfo();
            }
            catch (error) {
                throw error;
            }
        });
    }
    get config() {
        return { environment: this._AfasConfig.env, environmentType: this._AfasConfig.envType };
    }
}
exports.Profit = Profit;
