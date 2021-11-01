export default class HomeAction {
    type: ActionType;
    payload: ActionPayload;

    constructor(type: ActionType = 'NONE', payload: ActionPayload = {}) {
        this.type = type;
        this.payload = payload;
    }
}

type ActionType = string & ('INITIALIZE' | 'REPLY_TO_MESSAGE' | 'POST_MESSAGE' | 'NONE');

interface ActionPayload {
    messageId?: string;
    replyMessage?: string;
    messageContent?: string;
}
