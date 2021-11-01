import BaseState from "../../models/base";

export class HomeState extends BaseState {
    homeStatus: Status = "IDLE";
    data: Data = {
        messages: []
    };
}

type Status = string & ('IDLE' | 'LOADING');

interface Data {
    messages: {
        id: string;
        authorName: string;
        content: string;
        replies: {
            id: string;
            content: string;
            authorName: string;
        }[];
    }[]
}
