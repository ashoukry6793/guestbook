import {User} from "../models/User";
import {ID} from "../models/CoreModels";

export interface UsersRepo {
    insert(user: User): Promise<void>;
    fetchById(id: ID): Promise<User>;
    existsByUserName(userName: string): Promise<boolean>;
    find(filter: Record<string, unknown>): Promise<User[]>;
}
