import {BaseProcessor} from "../../../core/models/BaseClasses";
import {HttpStatusCode, UserRole} from "../../../core/models/CoreModels";
import {Request, Response} from "express-serve-static-core";
import {ErrorType, UnAuthorizedError} from "../../../core/models/Errors";
import {ServerCtx} from "../server";

export abstract class BaseApiHandler<T, R> {
    roles: UserRole[];
    ctx: ServerCtx | undefined;

    constructor(roles: UserRole[]) {
        this.roles = roles;
    }

    setCtx(ctx: ServerCtx) {
        this.ctx = ctx;
        return this;
    }

    abstract createProcessor(expressReq: Request): BaseProcessor<R>
    abstract writeResponse(expressRes: Response, response: R | ErrorPayload): string

    readRequest(expressReq: Request): T {
        const request = {
            ...expressReq.body,
            ...expressReq.params,
            ...expressReq.query,
        };

        const authToken = this.extractToken(expressReq);

        if (authToken) {
            const tokenParams = this.ctx!.authTokenManager.decode(authToken);
            request["__businessKey__"] = tokenParams.userBusinessKey;
            request["__userId__"] = tokenParams.userId;
            request["__userRole__"] = tokenParams.userRole;
        }

        return request;
    }

    handle() {
        return async (expressReq: Request, expressRes: Response) => {
            try {
                if (!this.ctx) {
                    throw new Error("Server ctx is not defined, make sure you have set ctx before handle");
                }

                this.validateTokenAndRoles(expressReq);

                const processor = this.createProcessor(expressReq);
                const response = await processor.execute();

                this.writeResponse(expressRes.status(HttpStatusCode.OK), response);
            } catch (err) {
                // @ts-ignore
                switch (err.type) {
                    case ErrorType.BAD_REQUEST:
                        // @ts-ignore
                        this.writeResponse(expressRes.status(HttpStatusCode.BAD_REQUEST), new ErrorPayload(err.name, err.message, err.stack));
                        break;
                    case ErrorType.CONFLICT:
                        // @ts-ignore
                        this.writeResponse(expressRes.status(HttpStatusCode.CONFLICT), new ErrorPayload(err.name, err.message, err.stack));
                        break;
                    case ErrorType.UN_AUTHORIZED:
                        // @ts-ignore
                        this.writeResponse(expressRes.status(HttpStatusCode.UNAUTHORIZED), new ErrorPayload(err.name, err.message, err.stack));
                        break;
                    case ErrorType.RESOURCE_NOT_FOUND:
                        // @ts-ignore
                        this.writeResponse(expressRes.status(HttpStatusCode.NOT_FOUND), new ErrorPayload(err.name, err.message, err.stack));
                        break;
                    default:
                        // @ts-ignore
                        this.writeResponse(expressRes.status(HttpStatusCode.INTERNAL_ERROR), new ErrorPayload("UnClassifiedError", "server error", err.stack));
                }
            }
        }
    }

    private validateTokenAndRoles(expressReq: Request) {
        if (!this.roles.length) return;

        const authToken = this.extractToken(expressReq);

        if (!authToken) {
            throw new UnAuthorizedError('Token is not found or blank');
        }

        this.ctx!.authTokenManager.validateToken(authToken);
    }

    private extractToken(expressReq: Request) {
        const authToken = expressReq.header('Authorization');
        if (!authToken || authToken.split(' ')[0] !== "Bearer") {
            return "";
        }

        return authToken.split(' ')[1];
    }
}

export class ErrorPayload {
    code: string;
    devDetails: string;
    trace: string;

    constructor(code: string, devDetails: string, trace: string) {
        this.code = code;
        this.devDetails = devDetails;
        this.trace = trace;
    }
}


