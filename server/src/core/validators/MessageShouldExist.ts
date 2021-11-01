import {Validator} from "../models/BaseClasses";
import {ID} from "../models/CoreModels";
import MessagesRepo from "../repositories/MessagesRepo";
import {MessageDoesNotExistError} from "../models/Errors";

export default class MessageShouldExist implements Validator {
    private readonly id: ID;
    private readonly messagesRepo: MessagesRepo;

    constructor(id: ID, messagesRepo: MessagesRepo) {
        this.id = id;
        this.messagesRepo = messagesRepo;
    }

    async orThrow(): Promise<void> {
        const users = await this.messagesRepo.find({"_id": this.id.valueOf()});

        if (!users.length) {
            throw new MessageDoesNotExistError(`Message with id ${this.id.toString} does not exist`);
        }
    }
}
