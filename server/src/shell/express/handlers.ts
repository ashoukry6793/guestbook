import BaseJsonAPIHandler from "./base/BaseJsonAPIHandler";
import {LoginProcessor, LoginRequest, LoginResponse} from "../../core/processors/LoginProcessor";
import {Request} from "express-serve-static-core";
import {RegisterProcessor, RegisterRequest, RegisterResponse} from "../../core/processors/RegisterProcessor";
import UsersRepoImpl from "../repositories/UsersRepoImpl";
import {
    ListSingleUserProcessor,
    ListSingleUserRequest,
    ListSingleUserResponse
} from "../../core/processors/ListSingleUserProcessor";
import {ListMessagesProcessor, ListMessagesResponse} from "../../core/processors/ListMessagesProcessor";
import MessagesRepoImpl from "../repositories/MessagesRepoImpl";
import {AddMessageProcessor, AddMessageRequest} from "../../core/processors/AddMessageProcessor";
import {ReplyToMessageProcessor, ReplyToMessageRequest} from "../../core/processors/ReplyToMessageProcessor";

export class LoginHandler extends BaseJsonAPIHandler<LoginRequest, LoginResponse> {

    createProcessor(expressReq: Request): LoginProcessor {
        return new LoginProcessor(this.readRequest(expressReq), this.ctx!.authTokenManager, new UsersRepoImpl(this.ctx!.db));
    }
}

export class RegisterHandler extends BaseJsonAPIHandler<RegisterRequest, RegisterResponse> {
    createProcessor(expressReq: Request): RegisterProcessor {
        return new RegisterProcessor(this.readRequest(expressReq), new UsersRepoImpl(this.ctx!.db));
    }
}

export class ListSingleUserHandler extends BaseJsonAPIHandler<ListSingleUserRequest, ListSingleUserResponse> {
    createProcessor(expressReq: Request): ListSingleUserProcessor {
        return new ListSingleUserProcessor(this.readRequest(expressReq), new UsersRepoImpl(this.ctx!.db));
    }
}

export class ListMessagesHandler extends BaseJsonAPIHandler<void, ListMessagesResponse> {
    createProcessor(expressReq: Request): ListMessagesProcessor {
        return new ListMessagesProcessor(new MessagesRepoImpl(this.ctx!.db));
    }
}

export class AddMessageHandler extends BaseJsonAPIHandler<AddMessageRequest, void> {
    createProcessor(expressReq: Request): AddMessageProcessor {
        return new AddMessageProcessor(this.readRequest(expressReq), new MessagesRepoImpl(this.ctx!.db), new UsersRepoImpl(this.ctx!.db));
    }
}

export class ReplyToMessageHandler extends BaseJsonAPIHandler<ReplyToMessageRequest, void> {
    createProcessor(expressReq: Request): ReplyToMessageProcessor {
        return new ReplyToMessageProcessor(this.readRequest(expressReq), new MessagesRepoImpl(this.ctx!.db), new UsersRepoImpl(this.ctx!.db));
    }
}
