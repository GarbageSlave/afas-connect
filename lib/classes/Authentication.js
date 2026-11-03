var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { endpoints } from '../constants/index.js';
const tokenFailure = 'Failed to fetch an OAuth access token';
function oauthTokenUrl(AfasConfig) {
    const env = AfasConfig.env.replace(/[^\d.]/g, '');
    return 'https://' + env + '.' + endpoints.rest[AfasConfig.envType] + '/ProfitRestServices/oauth/token';
}
export default class Authentication {
    constructor(AfasConfig) {
        // Sanity check
        if (Boolean(AfasConfig.token) === Boolean(AfasConfig.oauth)) {
            throw new Error('Invalid authentication combination: pass either token or oauth');
        }
        this.token = AfasConfig.token;
        this.oauth = AfasConfig.oauth;
        this.tokenUrl = oauthTokenUrl(AfasConfig);
    }
    get envelopeToken() {
        return this.oauth ? undefined : this.token;
    }
    // Helper function to determine whether a new configuration authenticates the same way as the current one, so the existing access token remains valid
    matches(AfasConfig) {
        var _a, _b;
        const oauth = (_a = AfasConfig.oauth) !== null && _a !== void 0 ? _a : {};
        const current = (_b = this.oauth) !== null && _b !== void 0 ? _b : {};
        return (AfasConfig.token === this.token &&
            oauthTokenUrl(AfasConfig) === this.tokenUrl &&
            Object.keys(Object.assign(Object.assign({}, oauth), current)).every((key) => oauth[key] === current[key]));
    }
    requestAccessToken(credentials) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const description = tokenFailure;
            let response;
            let rawBody;
            try {
                response = yield fetch(this.tokenUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({
                        grant_type: 'client_credentials',
                        client_id: credentials.clientId,
                        client_secret: credentials.clientSecret,
                    }).toString(),
                });
                rawBody = yield response.text();
            }
            catch (error) {
                throw { body: `Failed [POST]:${this.tokenUrl}, ${error}`, response: null, description };
            }
            let body = null;
            try {
                body = JSON.parse(rawBody);
            }
            catch (error) {
                // Not JSON, handled below as a failed request
            }
            if (!response.ok || !(body === null || body === void 0 ? void 0 : body.access_token)) {
                const reason = (_a = body === null || body === void 0 ? void 0 : body.error_description) !== null && _a !== void 0 ? _a : body === null || body === void 0 ? void 0 : body.error;
                const detail = reason ? `: ${reason}` : rawBody ? ` (HTTP ${response.status})` : '';
                throw { body: rawBody, response, description: description + detail };
            }
            const expiresIn = Number(body.expires_in);
            // Renew a minute early, so the token doesn't expire between handing it out and Profit checking it
            this.accessToken = { value: body.access_token, expiresAt: Date.now() + (expiresIn - 60) * 1000 };
            return body.access_token;
        });
    }
    oauthToken(oauth, renew) {
        return __awaiter(this, void 0, void 0, function* () {
            if ('accessToken' in oauth) {
                const { accessToken } = oauth;
                if (typeof accessToken === 'string') {
                    return accessToken;
                }
                try {
                    return yield accessToken(renew);
                }
                catch (error) {
                    const reason = error instanceof Error ? error.message : error;
                    throw { body: `${error}`, response: null, description: `${tokenFailure}: ${reason}` };
                }
            }
            if (!renew && this.accessToken && Date.now() < this.accessToken.expiresAt) {
                return this.accessToken.value;
            }
            // Simultaneous calls share one token request
            if (!this.pending) {
                const done = () => (this.pending = undefined);
                this.pending = this.requestAccessToken(oauth).then((token) => {
                    done();
                    return token;
                }, (error) => {
                    done();
                    throw error;
                });
            }
            return this.pending;
        });
    }
    header(renew) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.oauth) {
                return 'Bearer ' + (yield this.oauthToken(this.oauth, renew));
            }
            return 'AfasToken ' + Buffer.from(this.token).toString('base64');
        });
    }
    fetch(url, init) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const send = (renew) => __awaiter(this, void 0, void 0, function* () {
                const headers = Object.assign(Object.assign({}, init.headers), { Authorization: yield this.header(renew) });
                try {
                    return yield fetch(url, Object.assign(Object.assign({}, init), { headers }));
                }
                catch (error) {
                    throw { body: `Failed [${init.method}]:${url}, ${error}`, response: null };
                }
            });
            const response = yield send(false);
            // A 401 possibly means the access token is invalid or expired, so we attempt to renew it if Oauth is defined
            if (response.status === 401 && this.oauth) {
                // Release the connection of the rejected response before retrying
                yield ((_a = response.body) === null || _a === void 0 ? void 0 : _a.cancel());
                return yield send(true);
            }
            return response;
        });
    }
}
