export class ProfitError extends Error {
    constructor(description, error) {
        var _a, _b, _c, _d;
        let body;
        try {
            body = JSON.parse(error.body);
        }
        catch (err) {
            body = error.body;
        }
        super(body ? body.externalMessage : description);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, ProfitError);
        this.statusCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : null;
        this.statusText = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.statusText) !== null && _d !== void 0 ? _d : '';
        this.body = body;
    }
}
