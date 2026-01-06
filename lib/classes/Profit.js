var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import GetConnector from './GetConnector.js';
import UpdateConnector from './UpdateConnector.js';
import DataConnector from './DataConnector.js';
import SoapConnector from './SoapConnector.js';
import InsiteConnector from './InsiteConnector.js';
export class Profit {
    constructor(AfasConfig) {
        this._AfasConfig = AfasConfig;
        this.GetConnector = new GetConnector(AfasConfig);
        this.UpdateConnector = new UpdateConnector(AfasConfig);
        this.DataConnector = new DataConnector(AfasConfig);
        this.SoapConnector = new SoapConnector(AfasConfig);
        this.InsiteConnector = new InsiteConnector(AfasConfig);
        this.CustomConnector = this.DataConnector;
    }
    changeConfig(AfasConfig) {
        this._AfasConfig = Object.assign(Object.assign({}, this._AfasConfig), AfasConfig);
        this.GetConnector = new GetConnector(this._AfasConfig);
        this.UpdateConnector = new UpdateConnector(this._AfasConfig);
        this.DataConnector = new DataConnector(this._AfasConfig);
        this.SoapConnector = new SoapConnector(this._AfasConfig);
        this.InsiteConnector = new InsiteConnector(this._AfasConfig);
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
