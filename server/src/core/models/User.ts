import {ID} from "./CoreModels";

export class User {
    readonly _id: ID;
    readonly userName: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly password: string;
    readonly creationDate: Date;

    constructor({_id, userName, password, firstName, lastName, creationDate}: UserArgs = {
        _id: ID.blank(),
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        creationDate: new Date(0)}
    ) {
        this._id = _id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.creationDate = new Date(creationDate);
    }
}

interface UserArgs {
    _id: ID;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    creationDate: Date | string | number;
}
