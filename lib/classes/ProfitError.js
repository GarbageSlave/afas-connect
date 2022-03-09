"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfitError = void 0;
class ProfitError extends Error {
    constructor(description, error) {
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
        this.statusCode = error.response.status;
        this.statusText = error.response.statusText;
        this.body = body;
    }
}
exports.ProfitError = ProfitError;
