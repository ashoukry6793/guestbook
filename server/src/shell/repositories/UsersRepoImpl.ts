import {UsersRepo} from "../../core/repositories/UsersRepo";
import {Db} from "mongodb";
import MongoDBRepo from "../mongodb/MongoDBRepo";
import {User} from "../../core/models/User";
import {ID} from "../../core/models/CoreModels";

export default class UsersRepoImpl implements UsersRepo {
    private readonly mongoRepo: MongoDBRepo<UserDocument>

    constructor(mongodb: Db) {
        this.mongoRepo = new MongoDBRepo<UserDocument>(mongodb, "Users");
    }

    async insert(user: User): Promise<void> {
        await this.mongoRepo.insert(this.toUserDocument(user));
    }

    async fetchById(id: ID): Promise<User> {
        return this.fromUserDocument(await this.mongoRepo.findById(id));
    }

    async existsByUserName(userName: string): Promise<boolean> {
        const users = await this.mongoRepo.find({userName});

        return Boolean(users.length);
    }

    async find(filter: Record<string, unknown>): Promise<User[]> {
        const users = await this.mongoRepo.find(filter);
        return users.map(user => this.fromUserDocument(user));
    }

    private toUserDocument(user: User) {
        return {
            _id: user._id.valueOf(),
            userName: user.userName,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            creationDate: user.creationDate.valueOf()
        }
    }

    private fromUserDocument(userDocument: UserDocument) {
        return new User({
            _id: new ID(userDocument._id),
            userName: userDocument.userName,
            password: userDocument.password,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            creationDate: new Date(userDocument.creationDate)
        })
    }
}

interface UserDocument {
    _id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    creationDate: number;
}
