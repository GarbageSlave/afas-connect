"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profit = void 0;
const GetConnector_1 = require("./GetConnector");
const UpdateConnector_1 = require("./UpdateConnector");
const CustomConnector_1 = require("./CustomConnector");
class Profit {
    constructor(config) {
        this.AfasConfig = config;
        this.GetConnector = new GetConnector_1.default(config);
        this.UpdateConnector = new UpdateConnector_1.default(config);
        this.CustomConnector = new CustomConnector_1.default(config);
    }
    changeConfig(config) {
        this.AfasConfig = Object.assign(Object.assign({}, this.AfasConfig), config);
    }
    get config() {
        return { environment: this.AfasConfig.env, environmentType: this.AfasConfig.envType };
    }
}
exports.Profit = Profit;
