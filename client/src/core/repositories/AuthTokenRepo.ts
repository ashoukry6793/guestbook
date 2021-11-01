export default interface AuthTokenRepo {
    saveToken(token: string): Promise<void>;
    getToken(): Promise<string>
}
