import {LoginProcessor} from "../../../src/core/processors/LoginProcessor";
import AuthTokenManagerImpl from "../../../src/shell/AuthTokenManagerImpl";
import UsersRepoImpl from "../../../src/shell/repositories/UsersRepoImpl";
import {User} from "../../../src/core/models/User";
import {ID} from "../../../src/core/models/CoreModels";
// @ts-ignore
const sinon = require("sinon");
const sinon$ = sinon.createSandbox();

describe('LoginProcessor Unit', () => {

    afterEach(() => {
        sinon$.restore();
    })

    const usersRepoMock = {
        insert: jest.fn(),
        fetchById: jest.fn(),
        existsByUserName: jest.fn(),
        find: jest.fn()
    };

    it('throws on missing userName', async function () {
        try {
            await new LoginProcessor(
                { userName: "", password: "1234" },
                new AuthTokenManagerImpl("12", "18d"),
                usersRepoMock).execute();
            throw new Error("should have failed");
        } catch (err) {
            expect(err.name).toBe("MissingParameterError");
        }
    });

    it('throws on missing password', async function () {
        try {
            await new LoginProcessor(
                { userName: "tes", password: "" },
                new AuthTokenManagerImpl("12", "18d"),
                usersRepoMock).execute();
            throw new Error("should have failed");
        } catch (err) {
            expect(err.name).toBe("MissingParameterError");
        }
    });

    it('throws on invalid credentials', async function () {
        usersRepoMock.find = jest.fn(()=>[]);

        try {
            await new LoginProcessor(
                { userName: "test", password: "1234" },
                new AuthTokenManagerImpl("12", "18d"),
                usersRepoMock).execute();
            throw new Error("should have failed");
        } catch (err) {
            expect(err.name).toBe("UserCredentialsAreNotValidError");
        }
    });

    it('generates token on successful login', async function () {
        const userId = ID.generate();
        usersRepoMock.find = jest.fn(()=>[
            new User({
                _id: userId,
                userName: "test",
                password: "1234",
                firstName: "first",
                lastName: "last",
                creationDate: new Date(),
            })
        ]);

        sinon$.stub(AuthTokenManagerImpl.prototype, "generateToken").returns("faketoken");

        const response = await new LoginProcessor(
            { userName: "test", password: "1234" },
            new AuthTokenManagerImpl("12", "18d"),
            usersRepoMock
        ).execute();

        expect(response.id).toBe(userId.toString());
        expect(response.token).toBe("faketoken");
    });
});
