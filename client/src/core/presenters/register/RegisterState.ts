import BaseState from "../../models/base";

export default class RegisterState extends BaseState {
    status: Status = "IDLE";
    data: Data = {
        registerForm: {
            userName: '',
            password: '',
            firstName: '',
            lastName: '',
        }
    };
}

type Status = string & ('IDLE' | 'LOADING');

interface Data {
    registerForm: {
        userName: string;
        password: string;
        firstName: string;
        lastName: string;
    }
}
