import { unescapeXml } from '../utils/xml.js';

export class ProfitError extends Error {
  public statusCode: number;
  public statusText: string;
  public body: any;

  constructor(description: string, error: { body: string; response: any; description?: string }) {
    let body;
    try {
      body = JSON.parse(error.body);
    } catch (err) {
      body = error.body;
    }
    // REST errors are JSON with an externalMessage, SOAP errors are a fault envelope with a faultstring
    const fault = typeof body === 'string' ? body.match(/<faultstring>([\s\S]*?)<\/faultstring>/) : null;
    const message = error.description ?? body?.externalMessage ?? (fault ? unescapeXml(fault[1]) : description);
    // Profit sometimes answers with only a status code, like a 401 for a rejected token
    const empty = error.response && error.body === '';
    super(empty ? `${message}: Profit responded with HTTP ${error.response.status} and an empty body` : message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, ProfitError);
    this.statusCode = error.response?.status ?? null;
    this.statusText = error.response?.statusText ?? '';
    this.body = body;
  }
}
