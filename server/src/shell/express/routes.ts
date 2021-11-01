import {
    AddMessageHandler,
    ListMessagesHandler,
    ListSingleUserHandler,
    LoginHandler,
    RegisterHandler,
    ReplyToMessageHandler
} from "./handlers";
import {Route} from "./server";
import {UserRole} from "../../core/models/CoreModels";

export default [
    {
        path: '/api/v1/login',
        method: 'post',
        handler: new LoginHandler([]),
    },
    {
        path: '/api/v1/register',
        method: 'post',
        handler: new RegisterHandler([]),
    },
    {
        path: '/api/v1/users/:id',
        method: 'get',
        handler: new ListSingleUserHandler([UserRole.CUSTOMER]),
    },
    {
        path: '/api/v1/messages',
        method: 'get',
        handler: new ListMessagesHandler([UserRole.CUSTOMER]),
    },
    {
        path: '/api/v1/messages',
        method: 'post',
        handler: new AddMessageHandler([UserRole.CUSTOMER]),
    },
    {
        path: '/api/v1/messages/:id/replies',
        method: 'post',
        handler: new ReplyToMessageHandler([UserRole.CUSTOMER]),
    }
] as Route[];
