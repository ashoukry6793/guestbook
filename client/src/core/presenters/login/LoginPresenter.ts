import UsersRepo from "../../repositories/UsersRepo";
import {Notification, NotificationService} from "../../services/NotificationService";
import LoginState from "./LoginState";
import LoginAction from "./LoginAction";
import {BaseError} from "../../models/Erros";
import AuthTokenRepo from "../../repositories/AuthTokenRepo";

export default class LoginPresenter {
    private readonly usersRepo: UsersRepo;
    private readonly notificationService: NotificationService;
    private readonly authTokenRepo: AuthTokenRepo;
    private _state: LoginState;

    constructor(usersRepo: UsersRepo, notificationService: NotificationService, authTokenRepo: AuthTokenRepo) {
        this.usersRepo = usersRepo;
        this.notificationService = notificationService;
        this.authTokenRepo = authTokenRepo;
        this._state = new LoginState();
    }

    async dispatch(action: LoginAction, handler: (state: LoginState)=>void): Promise<void> {
        if (action.type === "LOGIN") {
            await this.onLogin(handler);
        } else if (action.type === "UPDATE_FORM") {
            this.updateForm(action, handler);
        } else {
            throw new Error(`Unsupported action type ${action.type}`);
        }
    }


    private async onLogin(handler: (state: LoginState)=>void) : Promise<void> {
        const newState = this._state.clone();
        newState.status = "LOADING";
        this._state = newState;
        handler(this._state);
        await this.login(handler);
    }

    private updateForm(action: LoginAction, handler: (state: LoginState)=>void): void {
        const newState = this._state.clone();
        newState.data.loginForm.userName = action.payload.userName;
        newState.data.loginForm.password = action.payload.password;
        this._state = newState;
        handler(this._state);
    }

    private async login(handler: (state: LoginState)=>void): Promise<void> {
        try {
            const token = await this.usersRepo.login(
                this._state.data.loginForm.userName,
                this._state.data.loginForm.password);

            await this.authTokenRepo.saveToken(token);
            const newState = this._state.clone();
            newState.status = "IDLE";
            this._state = newState;
            handler(this._state);
        } catch (err) {
            const newState = this._state.clone();
            newState.status = "IDLE";
            this._state = newState;
            handler(this._state);

            this.notificationService.notify(Notification.from(err as BaseError));
        }
    }

    get state() {
        return this._state;
    }
}
