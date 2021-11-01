import {BaseProcessor} from "../models/BaseClasses";
import MessagesRepo from "../repositories/MessagesRepo";
import {ShouldBePresent} from "../validators/ShouldBePresent";
import {Message} from "../models/Message";
import {ID} from "../models/CoreModels";
import {UsersRepo} from "../repositories/UsersRepo";

export class AddMessageProcessor extends BaseProcessor<void> {
    private readonly request: AddMessageRequest;
    private readonly messagesRepo: MessagesRepo;
    private readonly usersRepo: UsersRepo;

    constructor(request: AddMessageRequest, messagesRepo: MessagesRepo, usersRepo: UsersRepo) {
        super();
        this.request = request;
        this.messagesRepo = messagesRepo;
        this.usersRepo = usersRepo;
    }

    async validate(): Promise<void> {
        await new ShouldBePresent("message", this.request.message).orThrow();
    }

    async process(): Promise<void> {
        const user = await this.usersRepo.fetchById(new ID(Number(this.request.__userId__)));
        await this.messagesRepo.insert(new Message({
            _id: ID.generate(),
            message: this.request.message,
            createdBy: {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            creationDate: new Date(),
            replies: []
        }))
    }
}

export interface AddMessageRequest {
    message: string;
    __userId__: string;
}
