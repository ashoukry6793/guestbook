export class User {
    id: string;
    firstName: string;
    lastName: string;

    constructor({id, firstName, lastName}: UserArgs) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

interface UserArgs {
    id: string;
    firstName: string;
    lastName: string;
}
