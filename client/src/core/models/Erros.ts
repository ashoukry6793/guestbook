/* eslint max-classes-per-file: 0 */
export const ERRORS = {
  BAD_REQUEST: "Bad Request",
  NOT_FOUND: "Resource Not Found",
  CONFLICT: "Request Conflicts With Current state Of The Target Resource",
  UNAUTHORIZED: "You Are Not Authorized",
  CONNECTION_ERROR: "Connection Error",
  SERVER_ERROR: "Server Error",
  UNEXPECTED_ERROR: "Un-Expected Error",
};

export abstract class BaseError extends Error {
  abstract type: string;
  details: string = '';
}

export class ServerNetworkError extends BaseError {
  type = "SERVER_ERROR";

  constructor(details: string) {
    super(ERRORS.SERVER_ERROR);
    this.details = details;
  }
}

export class BadRequestNetworkError extends BaseError {
  type = "BAD_REQUEST";


  constructor(details: string) {
    super(ERRORS.BAD_REQUEST);
    this.details = details;
  }
}

export class NotFoundNetworkError extends BaseError {
  type = "NOT_FOUND";

  constructor(details: string) {
    super(ERRORS.NOT_FOUND);
    this.details = details;
  }
}

export class ConflictNetworkError extends BaseError {
  type = "CONFLICT";
  details;

  constructor(details: string) {
    super(ERRORS.CONFLICT);
    this.details = details;
  }
}

export class UnAuthorizedNetworkError extends BaseError {
  type = "UNAUTHORIZED";

  constructor(details: string) {
    super(ERRORS.UNAUTHORIZED);
    this.details = details;
  }
}

export class ConnectionNetworkError extends BaseError {
  type = "CONNECTION_ERROR";

  constructor() {
    super(ERRORS.CONNECTION_ERROR);
  }
}

export class UnExpectedError extends BaseError {
  type = "UNEXPECTED_ERROR";

  constructor(msg: string) {
    super(`${ERRORS.UNEXPECTED_ERROR}: ${msg}`);
  }
}
