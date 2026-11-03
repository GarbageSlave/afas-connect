var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import GetConnector from './GetConnector.js';
import UpdateConnector from './UpdateConnector.js';
import DataConnector from './DataConnector.js';
import SoapConnector from './SoapConnector.js';
import InsiteConnector from './InsiteConnector.js';
import Authentication from './Authentication.js';
export class Profit {
    constructor(AfasConfig) {
        this.AfasConfig = AfasConfig;
        // One Authentication for all connectors, so they reuse the same access token
        this.auth = new Authentication(AfasConfig);
        this.GetConnector = new GetConnector(AfasConfig, this.auth);
        this.UpdateConnector = new UpdateConnector(AfasConfig, this.auth);
        this.DataConnector = new DataConnector(AfasConfig, this.auth);
        this.SoapConnector = new SoapConnector(AfasConfig, this.auth);
        this.InsiteConnector = new InsiteConnector(AfasConfig, this.auth);
    }
    changeConfig(AfasConfig) {
        // token and oauth are alternatives, so the new config replaces whichever one was used
        const _a = this.AfasConfig, { token, oauth: currentOAuth } = _a, current = __rest(_a, ["token", "oauth"]);
        const config = Object.assign(Object.assign({}, current), AfasConfig);
        // Keep the current access token when the new config authenticates the same way.
        if (!this.auth.matches(config)) {
            this.auth = new Authentication(config);
        }
        this.AfasConfig = config;
        this.GetConnector = new GetConnector(this.AfasConfig, this.auth);
        this.UpdateConnector = new UpdateConnector(this.AfasConfig, this.auth);
        this.DataConnector = new DataConnector(this.AfasConfig, this.auth);
        this.SoapConnector = new SoapConnector(this.AfasConfig, this.auth);
        this.InsiteConnector = new InsiteConnector(this.AfasConfig, this.auth);
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
        return { environment: this.AfasConfig.env, environmentType: this.AfasConfig.envType };
    }
}
