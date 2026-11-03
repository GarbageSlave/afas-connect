import { IAfasConfig, TAfasOAuthConfig } from '../models/index.js';
import { endpoints } from '../constants/index.js';

const tokenFailure = 'Failed to fetch an OAuth access token';

function oauthTokenUrl(AfasConfig: IAfasConfig) {
  const env = AfasConfig.env.replace(/[^\d.]/g, '');
  return 'https://' + env + '.' + endpoints.rest[AfasConfig.envType] + '/ProfitRestServices/oauth/token';
}

export default class Authentication {
  private token?: string;
  private oauth?: TAfasOAuthConfig;
  private tokenUrl: string;
  private accessToken?: { value: string; expiresAt: number };
  private pending?: Promise<string>;

  constructor(AfasConfig: IAfasConfig) {
    // Sanity check
    if (Boolean(AfasConfig.token) === Boolean(AfasConfig.oauth)) {
      throw new Error('Invalid authentication combination: pass either token or oauth');
    }
    this.token = AfasConfig.token;
    this.oauth = AfasConfig.oauth;
    this.tokenUrl = oauthTokenUrl(AfasConfig);
  }

  public get envelopeToken(): string | undefined {
    return this.oauth ? undefined : this.token;
  }

  // Helper function to determine whether a new configuration authenticates the same way as the current one, so the existing access token remains valid
  public matches(AfasConfig: IAfasConfig): boolean {
    const oauth: Record<string, unknown> = AfasConfig.oauth ?? {};
    const current: Record<string, unknown> = this.oauth ?? {};
    return (
      AfasConfig.token === this.token &&
      oauthTokenUrl(AfasConfig) === this.tokenUrl &&
      Object.keys({ ...oauth, ...current }).every((key) => oauth[key] === current[key])
    );
  }

  private async requestAccessToken(credentials: { clientId: string; clientSecret: string }): Promise<string> {
    const description = tokenFailure;

    let response: Response;
    let rawBody: string;
    try {
      response = await fetch(this.tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: credentials.clientId,
          client_secret: credentials.clientSecret,
        }).toString(),
      });
      rawBody = await response.text();
    } catch (error) {
      throw { body: `Failed [POST]:${this.tokenUrl}, ${error}`, response: null, description };
    }

    let body: any = null;
    try {
      body = JSON.parse(rawBody);
    } catch (error) {
      // Not JSON, handled below as a failed request
    }

    if (!response.ok || !body?.access_token) {
      const reason = body?.error_description ?? body?.error;
      const detail = reason ? `: ${reason}` : rawBody ? ` (HTTP ${response.status})` : '';
      throw { body: rawBody, response, description: description + detail };
    }

    const expiresIn = Number(body.expires_in);
    // Renew a minute early, so the token doesn't expire between handing it out and Profit checking it
    this.accessToken = { value: body.access_token, expiresAt: Date.now() + (expiresIn - 60) * 1000 };
    return body.access_token;
  }

  private async oauthToken(oauth: TAfasOAuthConfig, renew: boolean): Promise<string> {
    if ('accessToken' in oauth) {
      const { accessToken } = oauth;
      if (typeof accessToken === 'string') {
        return accessToken;
      }
      try {
        return await accessToken(renew);
      } catch (error) {
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
      this.pending = this.requestAccessToken(oauth).then(
        (token) => {
          done();
          return token;
        },
        (error) => {
          done();
          throw error;
        },
      );
    }
    return this.pending;
  }

  private async header(renew: boolean): Promise<string> {
    if (this.oauth) {
      return 'Bearer ' + (await this.oauthToken(this.oauth, renew));
    }
    return 'AfasToken ' + Buffer.from(this.token as string).toString('base64');
  }

  public async fetch(
    url: string,
    init: { method: string; headers: Record<string, string>; body?: string },
  ): Promise<Response> {
    const send = async (renew: boolean) => {
      const headers = { ...init.headers, Authorization: await this.header(renew) };
      try {
        return await fetch(url, { ...init, headers });
      } catch (error) {
        throw { body: `Failed [${init.method}]:${url}, ${error}`, response: null };
      }
    };

    const response = await send(false);
    // A 401 possibly means the access token is invalid or expired, so we attempt to renew it if Oauth is defined
    if (response.status === 401 && this.oauth) {
      // Release the connection of the rejected response before retrying
      await response.body?.cancel();
      return await send(true);
    }
    return response;
  }
}
