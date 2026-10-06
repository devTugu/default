export class ApplicationException extends Error {
  constructor(
    public readonly code: string,
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApplicationException';
  }
}

export const AppErrors = {
  NOT_FOUND: (msg: string) => new ApplicationException('NOT_FOUND', 404, msg),
  CONFLICT: (msg: string) => new ApplicationException('CONFLICT', 409, msg),
  UNAUTHORIZED: (msg: string) =>
    new ApplicationException('UNAUTHORIZED', 401, msg),
  FORBIDDEN: (msg: string) => new ApplicationException('FORBIDDEN', 403, msg),
  BAD_REQUEST: (msg: string) =>
    new ApplicationException('BAD_REQUEST', 400, msg),
  TOO_MANY_REQUESTS: (msg: string) =>
    new ApplicationException('TOO_MANY_REQUESTS', 429, msg),
};
