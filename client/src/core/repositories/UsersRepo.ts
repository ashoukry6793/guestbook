export default interface UsersRepo {
    login(userName: string, password: string): Promise<string>;
    register(form: RegistrationForm): Promise<void>;
}

export interface RegistrationForm {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
}
