import MessagesRepo from "../../core/repositories/MessagesRepo";
import MongoDBRepo from "../mongodb/MongoDBRepo";
import {Db} from "mongodb";
import {Message} from "../../core/models/Message";
import {ID} from "../../core/models/CoreModels";

export default class MessagesRepoImpl implements MessagesRepo {
    private readonly mongoRepo: MongoDBRepo<MessageDocument>

    constructor(mongodb: Db) {
        this.mongoRepo = new MongoDBRepo<MessageDocument>(mongodb, "Messages");
    }

    async insert(message: Message): Promise<void> {
        await this.mongoRepo.insert(this.toMessageDocument(message));
    }

    async find(filter?: Record<string, unknown>): Promise<Message[]> {
        const messages = await this.mongoRepo.find(filter);
        return messages.map(message => this.fromMessageDocument(message));
    }

    async fetchById(id: ID): Promise<Message> {
        return this.fromMessageDocument(await this.mongoRepo.findById(id));
    }

    async replace(message: Message): Promise<void> {
        await this.mongoRepo.replace(this.toMessageDocument(message));
    }

    private toMessageDocument(message: Message) {
        return {
            _id: message._id.valueOf(),
            message: message.message,
            createdBy: {
                userId: message.createdBy.userId.valueOf(),
                firstName: message.createdBy.firstName,
                lastName: message.createdBy.lastName,
            },
            creationDate: message.creationDate.valueOf(),
            replies: message.replies.map(reply => ({
                _id: reply._id.valueOf(),
                message: reply.message,
                createdBy: {
                    userId: reply.createdBy.userId.valueOf(),
                    firstName: reply.createdBy.firstName,
                    lastName: reply.createdBy.lastName,
                },
                creationDate: reply.creationDate.valueOf(),
            }))
        }
    }

    private fromMessageDocument(messageDocument: MessageDocument) {
        return new Message({
            _id: new ID(messageDocument._id),
            message: messageDocument.message,
            createdBy: {
                userId: new ID(messageDocument.createdBy.userId),
                firstName: messageDocument.createdBy.firstName,
                lastName: messageDocument.createdBy.lastName,
            },
            creationDate: new Date(messageDocument.creationDate),
            replies: messageDocument.replies.map(reply => ({
                _id: new ID(reply._id),
                message: reply.message,
                createdBy: {
                    userId: new ID(reply.createdBy.userId),
                    firstName: reply.createdBy.firstName,
                    lastName: reply.createdBy.lastName,
                },
                creationDate: new Date(reply.creationDate),
            }))
        })
    }
}

interface MessageDocument {
    _id: number;
    message: string;
    createdBy: {
        userId: number;
        firstName: string;
        lastName: string;
    },
    creationDate: number;
    replies: {
        _id: number;
        message: string;
        createdBy: {
            userId: number;
            firstName: string;
            lastName: string;
        },
        creationDate: number;
    }[]
}
