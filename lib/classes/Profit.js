"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profit = void 0;
const GetConnector_1 = require("./GetConnector");
const UpdateConnector_1 = require("./UpdateConnector");
const CustomConnector_1 = require("./CustomConnector");
const SoapConnector_1 = require("./SoapConnector");
class Profit {
    constructor(AfasConfig) {
        this.AfasConfig = AfasConfig;
        this.GetConnector = new GetConnector_1.default(AfasConfig);
        this.UpdateConnector = new UpdateConnector_1.default(AfasConfig);
        this.CustomConnector = new CustomConnector_1.default(AfasConfig);
        this.SoapConnector = new SoapConnector_1.default(AfasConfig);
    }
    changeConfig(AfasConfig) {
        this.AfasConfig = Object.assign(Object.assign({}, this.AfasConfig), AfasConfig);
    }
    get config() {
        return { environment: this.AfasConfig.env, environmentType: this.AfasConfig.envType };
    }
}
exports.Profit = Profit;
