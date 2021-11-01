export class Message {
    id: string;
    message: string;
    createdBy: {
        userId: string;
        firstName: string;
        lastName: string;
    }
    replies: Reply[];

    constructor({id, message, createdBy, replies}: MessageArgs) {
        this.id = id;
        this.message = message;
        this.createdBy = createdBy;
        this.replies = replies;
    }
}

export class Reply {
    id: string;
    message: string;
    createdBy: {
        userId: string;
        firstName: string;
        lastName: string;
    }

    constructor({id, message, createdBy}: ReplyArgs) {
        this.id = id;
        this.message = message;
        this.createdBy = createdBy;
    }
}

interface MessageArgs {
    id: string;
    message: string;
    createdBy: {
        userId: string;
        firstName: string;
        lastName: string;
    }
    replies: Reply[];
}

interface ReplyArgs {
    id: string;
    message: string;
    createdBy: {
        userId: string;
        firstName: string;
        lastName: string;
    }
}
