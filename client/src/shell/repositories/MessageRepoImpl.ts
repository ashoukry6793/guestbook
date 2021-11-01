import MessageRepo from "../../core/repositories/MessageRepo";
import {Message, Reply} from "../../core/models/Message";
import Network from "../gatways/Network";
import {AddMessageRequest, ListMessagesResponse, ReplyToMessageRequest} from "../../core/models/dtos";

export default class MessageRepoImpl implements MessageRepo {

    async addMessage(message: string): Promise<void> {
        await Network.post<AddMessageRequest, void>("/api/v1/messages", {
            message,
        });
    }

    async listMessages(): Promise<Message[]> {
        const response = await Network.get<ListMessagesResponse>("/api/v1/messages");

        return response.messages.map(msg => new Message({
            id: msg.id,
            message: msg.message,
            createdBy: msg.createdBy,
            replies: msg.replies.map(reply => new Reply({
                id: reply.id,
                message: reply.message,
                createdBy: reply.createdBy
            }))
        }))
    }

    async replyMessage(messageId: string, replyMessage: string): Promise<void> {
        await Network.post<ReplyToMessageRequest, void>(`/api/v1/messages/${messageId}/replies`, {
            message: replyMessage
        });
    }
}
