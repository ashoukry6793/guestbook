import {Message} from "../models/Message";

export default interface MessageRepo {
    addMessage(message: string): Promise<void>;
    listMessages(): Promise<Message[]>;
    replyMessage(messageId: string, replyMessage: string): Promise<void>;
}
