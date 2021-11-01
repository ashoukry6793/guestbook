import {Validator} from "../models/BaseClasses";
import {UsersRepo} from "../repositories/UsersRepo";
import {UserNameAlreadyExistsError} from "../models/Errors";

export default class UserNameShouldBeUnique implements Validator {
    userName: string;
    usersRepo: UsersRepo;

    constructor(userName: string, usersRepo: UsersRepo) {
        this.userName = userName;
        this.usersRepo = usersRepo;
    }

    async orThrow() {
        if (await this.usersRepo.existsByUserName(this.userName)) {
            throw new UserNameAlreadyExistsError(`UserName ${this.userName} already exists`);
        }
    }
}
