import "./Login.css";
import {BaseSyntheticEvent, useState} from "react";
import LoginPresenter from "../../../core/presenters/login/LoginPresenter";
import UsersRepoImpl from "../../repositories/UsersRepoImpl";
import {notificationService} from "../../../core/services/NotificationService";
import LoginAction from "../../../core/presenters/login/LoginAction";
import {Button, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Save as SaveIcon} from "@mui/icons-material";
import {Link} from 'react-router-dom';
import {routePaths} from "../../../core/routes/routes";
import {useHistory} from "react-router-dom";
import AuthTokenRepoImpl from "../../repositories/AuthTokenRepoImpl";

export default function Login() {
    const history = useHistory();
    const [presenter] = useState(new LoginPresenter(new UsersRepoImpl(), notificationService, new AuthTokenRepoImpl()));
    const [state, setState] = useState(presenter.state);

    function updateUserNameHandler(event: BaseSyntheticEvent) {
        presenter.dispatch(new LoginAction("UPDATE_FORM", {
            userName: event.target.value,
            password: state.data.loginForm.password,
        }), (newState) => {
            setState(newState);
        })
    }

    function updatePasswordHandler(event: BaseSyntheticEvent) {
        presenter.dispatch(new LoginAction("UPDATE_FORM", {
            userName: state.data.loginForm.userName,
            password: event.target.value,
        }), (newState) => {
            setState(newState);
        })
    }

    function loginHandler() {
        presenter.dispatch(new LoginAction("LOGIN"), (newState) => {
            setState(newState);
        }).then(()=> {
            history.push(routePaths.HOME_VIEW_PATH);
        })
    }

    return (
        <div className="login-page">
            <div className="login-page__login-card">
                <div className="login-page__login-card__login__logo">
                    <h1>Guestbook</h1>
                </div>
                <div className="login-page__login-card__login__form">
                    <TextField
                        variant="outlined"
                        label="Username"
                        value={state.data.loginForm.userName}
                        onInput={updateUserNameHandler}
                    />
                    <TextField
                        variant="outlined"
                        label="Password"
                        type="password"
                        value={state.data.loginForm.password}
                        onInput={updatePasswordHandler}
                    />
                </div>
                <div>
                    {state.status === "LOADING" ?
                        <LoadingButton
                            startIcon={<SaveIcon />}
                            loading
                            loadingPosition="start"
                            fullWidth
                            variant="contained">
                            Login
                        </LoadingButton> :
                        <Button
                            fullWidth
                            variant="contained" onClick={loginHandler}>
                            Login
                        </Button>
                    }
                </div>
                <div>
                    New to GUESTBOOK ? <Link to={routePaths.REGISTER_VIEW_PATH}>Create an account.</Link>
                </div>
            </div>
        </div>
    )
}
