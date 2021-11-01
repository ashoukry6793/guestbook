export default class RegisterAction {
    type: ActionType;
    payload: ActionPayload;

    constructor(type: ActionType = "NONE", payload: ActionPayload = {
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
    }) {
        this.type = type;
        this.payload =payload;
    }
}

type ActionType = string & ( 'SUBMIT_REGISTRATION' | 'UPDATE_FORM' | 'NONE');

interface ActionPayload {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
}
