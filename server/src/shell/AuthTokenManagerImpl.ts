import {AuthTokenManager, TokenParams, UserRole} from "../core/models/CoreModels";
import {sign, verify, decode} from "jsonwebtoken";
import {UnAuthorizedError} from "../core/models/Errors";

export default class AuthTokenManagerImpl implements AuthTokenManager {
    private readonly secret: string;
    private readonly tokenExpiry: string;

    constructor(secret: string, tokenExpiry: string) {
        this.secret = secret;
        this.tokenExpiry = tokenExpiry;
    }


    generateToken(tokenParams: TokenParams): string {
        return sign(tokenParams, this.secret, {
            expiresIn: this.tokenExpiry,
        });
    }

    validateToken(token: string): void {
        try {
            verify(token, this.secret)
        } catch (err) {
            throw new UnAuthorizedError("Token is not valid");
        }

        const parsedToken = decode(token) as TokenParams;
        if (!(parsedToken.userRole in UserRole)) {
            throw new UnAuthorizedError("UserRole is not defined");
        }
    }

    decode(token: string): TokenParams {
        return decode(token) as TokenParams;
    }
}
