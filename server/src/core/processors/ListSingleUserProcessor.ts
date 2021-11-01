import {BaseProcessor} from "../models/BaseClasses";
import {UsersRepo} from "../repositories/UsersRepo";
import {ShouldBePresent} from "../validators/ShouldBePresent";
import {ID} from "../models/CoreModels";

export class ListSingleUserProcessor extends BaseProcessor<ListSingleUserResponse> {
    private readonly request: ListSingleUserRequest;
    private readonly usersRepo: UsersRepo;

    constructor(request: ListSingleUserRequest, usersRepo: UsersRepo) {
        super();
        this.request = request;
        console.log(this.request);
        this.usersRepo = usersRepo;
    }

    async validate(): Promise<void> {
        await new ShouldBePresent("id", this.request.id).orThrow()
    }

    async process(): Promise<ListSingleUserResponse> {
        const user = await this.usersRepo.fetchById(new ID(Number(this.request.id)))

        return {
            id: user._id.toString(),
            userName: user.userName,
            creationDate: user.creationDate.toUTCString()
        }
    }
}

export interface ListSingleUserRequest {
    id: string;
}

export interface ListSingleUserResponse {
    id: string;
    userName: string;
    creationDate: string;
}
