import {BaseApiHandler, ErrorPayload} from "./BaseAPIHandler";
import {Response} from "express-serve-static-core";

export default abstract class BaseJsonAPIHandler<T, R> extends BaseApiHandler<T, R> {

    writeResponse(expressRes: Response, response: R | ErrorPayload): string {
        expressRes.json(response);
        return JSON.stringify(response);
    }
}
