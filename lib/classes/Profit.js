"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profit = void 0;
const GetConnector_1 = require("./GetConnector");
const UpdateConnector_1 = require("./UpdateConnector");
const CustomConnector_1 = require("./CustomConnector");
class Profit {
    constructor(config) {
        this.AfasConfig = config;
    }
    /**
     * Returns a GetConnector class object
     * @return {GetConnector}
     */
    get GetConnector() {
        return new GetConnector_1.default(this.AfasConfig);
    }
    /**
     * Returns a UpdateConnector class object
     * @return {UpdateConnector}
     */
    get UpdateConnector() {
        return new UpdateConnector_1.default(this.AfasConfig);
    }
    /**
     * Returns a CustomConnector class object
     * @return {CustomConnector}
     */
    get CustomConnector() {
        return new CustomConnector_1.default(this.AfasConfig);
    }
    changeConfig(config) {
        this.AfasConfig = Object.assign(Object.assign({}, this.AfasConfig), config);
    }
    get config() {
        return { environment: this.AfasConfig.env, environmentType: this.AfasConfig.envType };
    }
}
exports.Profit = Profit;
