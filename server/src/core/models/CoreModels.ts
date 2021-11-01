export enum UserRole {
    CUSTOMER = "CUSTOMER"
}

export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_ERROR = 500
}


export interface AuthTokenManager {
    generateToken(tokenParams: TokenParams): string;
    validateToken(token: string): void;
    decode(token: string): TokenParams;
}

export class ID {
    private readonly value: number;

    constructor(id: number | string) {
        this.value = Number(id);
    }

    static generate() {
        return new ID(new Date().valueOf());
    }

    static blank() {
        return new ID(0);
    }

    valueOf() {
        return this.value;
    }

    toString() {
        return this.value.toString();
    }
}

export class TokenParams {
    userRole: string;
    userId: string;
    userBusinessKey: string;

    constructor(args: {userRole: string, userId: string, userBusinessKey: string, userName: string}) {
        this.userRole = args.userRole;
        this.userId = args.userId;
        this.userBusinessKey = args.userBusinessKey;
    }
}

