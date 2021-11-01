import {BaseProcessor} from "../models/BaseClasses";
import MessagesRepo from "../repositories/MessagesRepo";
import {ShouldBePresent} from "../validators/ShouldBePresent";
import MessageShouldExist from "../validators/MessageShouldExist";
import {ID} from "../models/CoreModels";
import {UsersRepo} from "../repositories/UsersRepo";
import {Reply} from "../models/Message";

export class ReplyToMessageProcessor extends BaseProcessor<void> {
    private readonly request: ReplyToMessageRequest;
    private readonly messagesRepo: MessagesRepo;
    private readonly usersRepo: UsersRepo;

    constructor(request: ReplyToMessageRequest, messagesRepo: MessagesRepo, usersRepo: UsersRepo) {
        super();
        this.request = request;
        this.messagesRepo = messagesRepo;
        this.usersRepo = usersRepo;
    }

    async validate() {
        await new ShouldBePresent("id", this.request.id).orThrow();
        await new ShouldBePresent("message", this.request.message).orThrow();

        await new MessageShouldExist(new ID(this.request.id), this.messagesRepo).orThrow();
    }

    async process(): Promise<void> {
        const user = await this.usersRepo.fetchById(new ID(this.request.__userId__));
        const message = await this.messagesRepo.fetchById(new ID(this.request.id));

        message.replies.push(new Reply({
            _id: ID.generate(),
            message: this.request.message,
            createdBy: {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            creationDate: new Date(),
        }));

        await this.messagesRepo.replace(message);
    }
}

export interface ReplyToMessageRequest {
    id: string;
    message: string;
    __userId__: string;
}
