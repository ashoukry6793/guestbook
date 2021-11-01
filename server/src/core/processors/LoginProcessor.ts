import {BaseProcessor} from "../models/BaseClasses";
import {ShouldBePresent} from "../validators/ShouldBePresent";
import {AuthTokenManager, UserRole} from "../models/CoreModels";
import UserCredentialsShouldBeValid from "../validators/UserCredentialsShouldBeValid";
import {UsersRepo} from "../repositories/UsersRepo";

export class LoginProcessor extends BaseProcessor<LoginResponse> {
    private readonly request: LoginRequest;
    private readonly authTokenManager: AuthTokenManager;
    private readonly usersRepo: UsersRepo;

    constructor(request: LoginRequest, authTokenManager: AuthTokenManager, usersRepo: UsersRepo) {
        super();
        this.request=  request;
        this.authTokenManager = authTokenManager;
        this.usersRepo = usersRepo;
    }

    async validate() {
        await new ShouldBePresent("userName", this.request.userName).orThrow();
        await new ShouldBePresent("password", this.request.password).orThrow();

        await new UserCredentialsShouldBeValid(this.request.userName, this.request.password, this.usersRepo).orThrow();
    }

    async process(): Promise<LoginResponse> {
        const [user] = await this.usersRepo.find({userName: this.request.userName});

        const token = this.authTokenManager.generateToken({
            userRole: UserRole.CUSTOMER,
            userId: user._id.toString(),
            userBusinessKey: user.userName,
        })

        return {
            id: user._id.toString(),
            token,
        };
    }
}

export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    token: string;
}
