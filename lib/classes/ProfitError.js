import { unescapeXml } from '../utils/xml.js';
export class ProfitError extends Error {
    constructor(description, error) {
        var _a, _b, _c, _d, _e, _f;
        let body;
        try {
            body = JSON.parse(error.body);
        }
        catch (err) {
            body = error.body;
        }
        // REST errors are JSON with an externalMessage, SOAP errors are a fault envelope with a faultstring
        const fault = typeof body === 'string' ? body.match(/<faultstring>([\s\S]*?)<\/faultstring>/) : null;
        const message = (_b = (_a = error.description) !== null && _a !== void 0 ? _a : body === null || body === void 0 ? void 0 : body.externalMessage) !== null && _b !== void 0 ? _b : (fault ? unescapeXml(fault[1]) : description);
        // Profit sometimes answers with only a status code, like a 401 for a rejected token
        const empty = error.response && error.body === '';
        super(empty ? `${message}: Profit responded with HTTP ${error.response.status} and an empty body` : message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, ProfitError);
        this.statusCode = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.status) !== null && _d !== void 0 ? _d : null;
        this.statusText = (_f = (_e = error.response) === null || _e === void 0 ? void 0 : _e.statusText) !== null && _f !== void 0 ? _f : '';
        this.body = body;
    }
}
