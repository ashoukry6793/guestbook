import MessageRepo from "../../repositories/MessageRepo";
import {Notification, NotificationService} from "../../services/NotificationService";
import HomeAction from "./HomeAction";
import {HomeState} from "./HomeState";
import {BaseError} from "../../models/Erros";
import UsersRepo from "../../repositories/UsersRepo";

export default class HomePresenter {
    private readonly messageRepo: MessageRepo;
    private readonly notificationService: NotificationService;
    private _state: HomeState;

    constructor(messageRepo: MessageRepo, notificationService: NotificationService) {
        this.messageRepo = messageRepo;
        this.notificationService = notificationService;
        this._state = new HomeState();
    }

    async dispatch(action: HomeAction, handler: (state: HomeState) => void) {
        if (action.type === "INITIALIZE") {
            await this.onInitialize(handler);
        } else if (action.type === "POST_MESSAGE") {
            await this.onPostMessage(action, handler);
        } else if (action.type === "REPLY_TO_MESSAGE") {
            await this.onReplyToMessage(action, handler);
        } else {
            throw new Error("action type is not supported");
        }
    }

    private async onInitialize(handler: (state: HomeState) => void): Promise<void> {
        const newState = this._state.clone();
        newState.homeStatus = "LOADING";
        this._state = newState;
        handler(this._state);
        await this.fetchAllMessages(handler);
    }

    private async onPostMessage(action: HomeAction, handler: (state: HomeState) => void): Promise<void> {
        const newState = this._state.clone();
        newState.homeStatus = "LOADING";
        this._state = newState;
        handler(this._state);
        await this.postMessage(action);
        await this.fetchAllMessages(handler);
    }

    private async onReplyToMessage(action: HomeAction, handler: (state: HomeState) => void): Promise<void> {
        const newState = this._state.clone();
        newState.homeStatus = "LOADING";
        this._state = newState;
        handler(this._state);
        await this.replyToMessage(action);
        await this.fetchAllMessages(handler);
    }

    private async replyToMessage(action: HomeAction) {
        try {
            await this.messageRepo.replyMessage(action.payload.messageId!, action.payload.replyMessage!);
        } catch (err) {
            this.notificationService.notify(Notification.from(err as BaseError));
        }
    }

    private async postMessage(action: HomeAction) {
        try {
            await this.messageRepo.addMessage(action.payload.messageContent!);
        } catch (err) {
            this.notificationService.notify(Notification.from(err as BaseError));
        }
    }

    private async fetchAllMessages(handler: (state: HomeState) => void) {
        try {
            const messages = await this.messageRepo.listMessages();

            const newState = this._state.clone();
            newState.homeStatus = "IDLE";
            newState.data.messages = messages.map(message => ({
                id: message.id,
                authorName: `${message.createdBy.firstName} ${message.createdBy.lastName}`,
                content: message.message,
                replies: message.replies.map(reply => ({
                    id: reply.id,
                    authorName: `${reply.createdBy.firstName} ${reply.createdBy.lastName}`,
                    content: reply.message
                }))
            }));
            this._state = newState;
            handler(this._state);
        } catch (err) {
            const newState = this._state.clone();
            newState.homeStatus = "IDLE";
            this._state = newState;
            handler(this._state);

            this.notificationService.notify(Notification.from(err as BaseError));
        }
    }

    get state() {
        return this._state;
    }
}
