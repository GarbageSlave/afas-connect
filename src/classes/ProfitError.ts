export class ProfitError extends Error {
  public statusCode: number;
  public statusText: string;
  public body: any;
  constructor (description: string, error:{ body: string, response: any }) {
    let body;
    try {
      body = JSON.parse(error.body)
    } catch (err) {
      body = error.body
    }
    super(body ? body.externalMessage : description)
    this.name = this.constructor.name
    Error.captureStackTrace(this, ProfitError);
    this.statusCode = error.response.status
    this.statusText = error.response.statusText
    this.body = body
  }
}
