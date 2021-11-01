import {BaseProcessor} from "../models/BaseClasses";
import MessagesRepo from "../repositories/MessagesRepo";

export class ListMessagesProcessor extends BaseProcessor<ListMessagesResponse> {
    private readonly messagesRepo: MessagesRepo;

    constructor(messagesRepo: MessagesRepo) {
        super();
        this.messagesRepo = messagesRepo;
    }

    async validate(): Promise<void> {
    }

    async process(): Promise<ListMessagesResponse> {
        const messages = await this.messagesRepo.find();

        return {
            messages: messages.map(message => ({
                id: message._id.toString(),
                message: message.message,
                createdBy: {
                    userId: message.createdBy.userId.toString(),
                    firstName: message.createdBy.firstName,
                    lastName: message.createdBy.lastName,
                },
                replies: message.replies.map(reply => ({
                    id: reply._id.toString(),
                    message: reply.message,
                    createdBy: {
                        userId: reply.createdBy.userId.toString(),
                        firstName: reply.createdBy.firstName,
                        lastName: reply.createdBy.lastName,
                    }
                }))
            }))
        }
    }
}

export interface ListMessagesResponse {
    messages: {
       id: string;
       message: string;
       createdBy: {
           userId: string;
           firstName: string;
           lastName: string;
       },
        replies: {
            id: string;
            message: string;
            createdBy: {
                userId: string;
                firstName: string;
                lastName: string;
            },
        }[]
    }[]
}
