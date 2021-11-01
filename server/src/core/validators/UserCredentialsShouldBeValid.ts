import {Validator} from "../models/BaseClasses";
import {UsersRepo} from "../repositories/UsersRepo";
import {UserCredentialsAreNotValidError} from "../models/Errors";

export default class UserCredentialsShouldBeValid implements Validator {
    private readonly userName: string;
    private readonly password: string;
    private readonly usersRepo: UsersRepo;

    constructor(userName: string, password: string, usersRepo: UsersRepo) {
        this.userName = userName;
        this.password = password;
        this.usersRepo = usersRepo;
    }

    async orThrow(): Promise<void> {
        const users = await this.usersRepo.find({
            userName: this.userName,
            password: this.password
        });

        if (!users.length) {
            throw new UserCredentialsAreNotValidError("User Credentials are not valid");
        }
    }
}
