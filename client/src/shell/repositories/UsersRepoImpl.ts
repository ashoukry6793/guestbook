import UsersRepo, {RegistrationForm} from "../../core/repositories/UsersRepo";
import Network from "../gatways/Network";
import {LoginRequest, LoginResponse, RegisterRequest} from "../../core/models/dtos";

export default class UsersRepoImpl implements UsersRepo {

    async register(form: RegistrationForm): Promise<void> {
        console.log('here')
        console.table(form);
        await Network.post<RegisterRequest, void>("/api/v1/register", {
            userName: form.userName,
            password: form.password,
            firstName: form.firstName,
            lastName: form.lastName,
        });
    }

    async login(userName: string, password: string): Promise<string> {
        const response = await Network.post<LoginRequest, LoginResponse>("/api/v1/login", {
            userName,
            password,
        });

        return response.token;
    }
}
