export interface AddMessageRequest {
    message: string;
}

export interface ReplyToMessageRequest {
    message: string;
}

export interface ListMessagesResponse {
    messages: {
        id: string;
        message: string;
        createdBy: {
            userId: string;
            firstName: string;
            lastName: string;
        },
        replies: {
            id: string;
            message: string;
            createdBy: {
                userId: string;
                firstName: string;
                lastName: string;
            },
        }[]
    }[]
}

export interface RegisterRequest {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    id: string;
}
