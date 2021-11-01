import {ID} from "./CoreModels";

export class Message {
    _id: ID;
    message: string;
    createdBy: {
        userId: ID;
        firstName: string;
        lastName: string;
    }
    creationDate: Date;
    replies: Reply[];

    constructor({_id, message, createdBy, replies, creationDate}: MessageArgs = {
        _id: ID.blank(),
        message: "",
        createdBy: {
            userId: ID.blank(),
            firstName: "",
            lastName: "",
        },
        creationDate: new Date(0),
        replies: []
    }) {
        this._id = _id;
        this.message = message;
        this.createdBy = createdBy;
        this.replies = replies;
        this.creationDate = creationDate
    }
}

export class Reply {
    _id: ID;
    message: string;
    createdBy: {
        userId: ID;
        firstName: string;
        lastName: string;
    }
    creationDate: Date;

    constructor({_id, message, createdBy, creationDate}: ReplyArgs = {
        _id: ID.blank(),
        message: "",
        createdBy: {
            userId: ID.blank(),
            firstName: "",
            lastName: "",
        },
        creationDate: new Date(0),
    }) {
        this._id = _id;
        this.message = message;
        this.createdBy = createdBy;
        this.creationDate = creationDate;
    }
}

interface MessageArgs {
    _id: ID;
    message: string;
    createdBy: {
        userId: ID;
        firstName: string;
        lastName: string;
    }
    creationDate: Date;
    replies: Reply[];
}

interface ReplyArgs {
    _id: ID;
    message: string;
    createdBy: {
        userId: ID;
        firstName: string;
        lastName: string;
    }
    creationDate: Date;
}
