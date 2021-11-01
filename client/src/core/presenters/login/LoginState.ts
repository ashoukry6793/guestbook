import BaseState from "../../models/base";

export default class LoginState extends BaseState {
    status: Status = "IDLE";
    data: Data = {
        loginForm: {
            userName: '',
            password: '',
        }
    };
}

type Status = string & ('IDLE' | 'LOADING');

interface Data {
    loginForm: {
        userName: string;
        password: string;
    }
}
