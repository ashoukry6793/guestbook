import AuthTokenRepo from "../../core/repositories/AuthTokenRepo";

export default class AuthTokenRepoImpl implements AuthTokenRepo {
    async saveToken(token: string): Promise<void> {
        await window.localStorage.setItem("auth", token);
    }

    async getToken(): Promise<string> {
        const token = await window.localStorage.getItem("auth");

        if (!token) return "";
        return token;
    }
}
