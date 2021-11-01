import {BaseProcessor} from "../models/BaseClasses";
import {ShouldBePresent} from "../validators/ShouldBePresent";
import UserNameShouldBeUnique from "../validators/UserNameShouldBeUnique";
import {UsersRepo} from "../repositories/UsersRepo";
import {User} from "../models/User";
import {ID} from "../models/CoreModels";

export class RegisterProcessor extends BaseProcessor<RegisterResponse> {
    private readonly request: RegisterRequest;
    private readonly usersRepo: UsersRepo;

    constructor(request: RegisterRequest, usersRepo: UsersRepo) {
        super();
        this.request = request;
        this.usersRepo = usersRepo;
    }

    async validate() {
        await new ShouldBePresent("userName", this.request.userName).orThrow();
        await new ShouldBePresent("password", this.request.password).orThrow();
        await new ShouldBePresent("firstName", this.request.firstName).orThrow();
        await new ShouldBePresent("lastName", this.request.lastName).orThrow();

        await new UserNameShouldBeUnique(this.request.userName, this.usersRepo).orThrow();
    }

    async process(): Promise<RegisterResponse> {
        const newUserId = ID.generate();
        const newUserCreationDate = new Date();
        const user = new User({
            _id: newUserId,
            userName: this.request.userName,
            password: this.request.password,
            firstName: this.request.firstName,
            lastName: this.request.lastName,
            creationDate: newUserCreationDate,
        });

        await this.usersRepo.insert(user);

        return {
            id: newUserId.toString(),
            creationDate: newUserCreationDate.toUTCString()
        };
    }
}

export interface RegisterRequest {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface RegisterResponse {
    id: string;
    creationDate: string;
}
