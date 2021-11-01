import {Message} from "../models/Message";
import {ID} from "../models/CoreModels";

export default interface MessagesRepo {
    insert(message: Message): Promise<void>;
    find(filter?: Record<string, unknown>): Promise<Message[]>;
    fetchById(id: ID): Promise<Message>;
    replace(message: Message): Promise<void>;
}
