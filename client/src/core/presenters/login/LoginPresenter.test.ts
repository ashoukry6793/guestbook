// @ts-ignore
import LoginPresenter from "./LoginPresenter";
import UsersRepoImpl from "../../../shell/repositories/UsersRepoImpl";
import {notificationService} from "../../services/NotificationService";
import AuthTokenRepoImpl from "../../../shell/repositories/AuthTokenRepoImpl";
import LoginAction from "./LoginAction";
import LoginState from "./LoginState";
// @ts-ignore
import sinon from "sinon";

const sinon$ = sinon.createSandbox();

describe('LoginPresenter Unit', function () {
    afterEach(() => {
        sinon$.restore();
    })

    it("updates form on UPDATE_FORM action", async function () {
        const presenter = new LoginPresenter(new UsersRepoImpl(), notificationService, new AuthTokenRepoImpl());

        const states: LoginState[] = [];
        await presenter.dispatch(new LoginAction("UPDATE_FORM", {
            password: "1234",
            userName: "test"
        }), (state) => {
            states.push(state);
        })

        expect(states[0].data.loginForm.password).toBe("1234");
        expect(states[0].data.loginForm.userName).toBe("test");
    });

    it("login on LOGIN action", async function () {
        const presenter = new LoginPresenter(new UsersRepoImpl(), notificationService, new AuthTokenRepoImpl());

        const states: LoginState[] = [];

        sinon$.stub(UsersRepoImpl.prototype, "login").resolves("faketoken");

        await presenter.dispatch(new LoginAction("UPDATE_FORM", {
            password: "1234",
            userName: "test"
        }), () => {});

        await presenter.dispatch(new LoginAction("LOGIN"), (state => {
            states.push(state);
        }));

        expect(states[0].status).toBe("LOADING");
        expect(states[0].data.loginForm.password).toBe("1234");
        expect(states[0].data.loginForm.userName).toBe("test");

        expect(states[1].status).toBe("IDLE");
        expect(states[1].data.loginForm.password).toBe("1234");
        expect(states[1].data.loginForm.userName).toBe("test");

        const token = await new AuthTokenRepoImpl().getToken();

        expect(token).toBe("faketoken");
    });
});
