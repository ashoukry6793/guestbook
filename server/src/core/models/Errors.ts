export enum ErrorType {
    BAD_REQUEST,
    UN_AUTHORIZED,
    CONFLICT,
    RESOURCE_NOT_FOUND
}

export abstract class BaseError extends Error {
    name: string;
    abstract type: ErrorType;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ResourceNotFoundError extends BaseError {
    type = ErrorType.RESOURCE_NOT_FOUND;
}

export class UnAuthorizedError extends BaseError {
    type = ErrorType.UN_AUTHORIZED;
}

export class MissingParameterError extends BaseError {
    type = ErrorType.BAD_REQUEST;
}

export class UserNameAlreadyExistsError extends BaseError {
    type = ErrorType.BAD_REQUEST;
}

export class UserCredentialsAreNotValidError extends BaseError {
    type = ErrorType.BAD_REQUEST;
}

export class MessageDoesNotExistError extends BaseError {
    type = ErrorType.BAD_REQUEST;
}
