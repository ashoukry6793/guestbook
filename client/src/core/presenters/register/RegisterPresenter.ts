import UsersRepo from "../../repositories/UsersRepo";
import {Notification, NotificationService} from "../../services/NotificationService";
import RegisterState from "./RegisterState";
import RegisterAction from "./RegisterAction";
import {BaseError} from "../../models/Erros";

export default class RegisterPresenter {
    private readonly usersRepo: UsersRepo;
    private readonly notificationService: NotificationService;
    private _state: RegisterState;

    constructor(usersRepo: UsersRepo, notificationService: NotificationService) {
        this.usersRepo = usersRepo;
        this.notificationService = notificationService;
        this._state = new RegisterState();
    }

    async dispatch(action: RegisterAction, handler: (state: RegisterState)=>void): Promise<void> {
        if (action.type === "SUBMIT_REGISTRATION") {
            await this.onSubmitRegistration(handler);
        } else if (action.type === "UPDATE_FORM") {
            this.updateForm(action, handler);
        } else {
            throw new Error(`Unsupported action type ${action.type}`);
        }
    }

    private updateForm(action: RegisterAction, handler: (state: RegisterState)=>void): void {
        const newState = this._state.clone();

        newState.data.registerForm.firstName = action.payload.firstName;
        newState.data.registerForm.lastName = action.payload.lastName;
        newState.data.registerForm.userName = action.payload.userName;
        newState.data.registerForm.password = action.payload.password;
        this._state = newState;

        handler(this._state);
    }

    async onSubmitRegistration(handler: (state: RegisterState)=>void): Promise<void> {
        const newState = this._state.clone();
        newState.status = "LOADING";
        this._state = newState;
        handler(this._state);

        await this.submitRegistration(handler)
    }

    private async submitRegistration(handler: (state: RegisterState)=>void): Promise<void> {
        try {
            await this.usersRepo.register({
                userName: this._state.data.registerForm.userName,
                password: this._state.data.registerForm.password,
                lastName: this._state.data.registerForm.lastName,
                firstName: this._state.data.registerForm.firstName,
            });

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
