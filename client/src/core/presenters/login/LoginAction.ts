export default class LoginAction {
    type: ActionType;
    payload: ActionPayload;

    constructor(type: ActionType = "NONE", payload: ActionPayload = {userName: '', password: ''}) {
        this.type = type;
        this.payload = payload;
    }
}

type ActionType = string & ( 'LOGIN' | 'UPDATE_FORM' | 'NONE');

interface ActionPayload {
    userName: string;
    password: string;
}
