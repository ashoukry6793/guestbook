import "./Register.css";
import {Button, TextField} from "@mui/material";
import {BaseSyntheticEvent, useState} from "react";
import UsersRepoImpl from "../../repositories/UsersRepoImpl";
import {notificationService} from "../../../core/services/NotificationService";
import RegisterPresenter from "../../../core/presenters/register/RegisterPresenter";
import RegisterAction from "../../../core/presenters/register/RegisterAction";
import {LoadingButton} from "@mui/lab";
import {Save as SaveIcon} from "@mui/icons-material";
import {useHistory} from 'react-router-dom';
import {routePaths} from "../../../core/routes/routes";

export default function Register() {
    const history = useHistory();
    const [presenter] = useState(new RegisterPresenter(new UsersRepoImpl(), notificationService));
    const form = Object.assign({}, presenter.state.data.registerForm);
    const [state, setState] = useState(presenter.state);

    function updateUserNameHandler(event: BaseSyntheticEvent) {
        presenter.dispatch(new RegisterAction("UPDATE_FORM", {
            ...form,
            userName: event.target.value,
        }), (newState) => {
            setState(newState);
        })
    }

    function updatePasswordHandler(event: BaseSyntheticEvent) {
        presenter.dispatch(new RegisterAction("UPDATE_FORM", {
            ...form,
            password: event.target.value,
        }), (newState) => {
            setState(newState);
        });
    }

    function updateFirstNameHandler(event: BaseSyntheticEvent) {
        presenter.dispatch(new RegisterAction("UPDATE_FORM", {
            ...form,
            firstName: event.target.value,
        }), (newState) => {
            setState(newState);
        })
    }

    function updateLastNameHandler(event: BaseSyntheticEvent) {
        presenter.dispatch(new RegisterAction("UPDATE_FORM", {
            ...form,
            lastName: event.target.value,
        }), (newState) => {
            setState(newState);
        })
    }


    function submitHandler() {
        presenter.dispatch(new RegisterAction("SUBMIT_REGISTRATION"), (newState) => {
            setState(newState);
        }).then(()=> {
            history.push(routePaths.LOGIN_VIEW_PATH);
        })
    }

    return (
        <div className="register-page">
            <div className="register-page__register-card">
                <div className="register-page__register-card__header">
                    <h2>Welcome To</h2>
                    <h1>GUESTBOOK</h1>
                </div>
                <div className="register-page__register-card__register__form">
                    <div>
                        <TextField
                            variant="outlined"
                            label="First Name"
                            value={state.data.registerForm.firstName}
                            onInput={updateFirstNameHandler}
                        />
                        <TextField
                            variant="outlined"
                            label="Last Name"
                            value={state.data.registerForm.lastName}
                            onInput={updateLastNameHandler}
                        />
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            label="Username"
                            fullWidth
                            value={state.data.registerForm.userName}
                            onInput={updateUserNameHandler}
                        />
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            label="Password"
                            type="password"
                            fullWidth
                            value={state.data.registerForm.password}
                            onInput={updatePasswordHandler}
                        />
                    </div>
                </div>
                <div>
                    {state.status === "LOADING" ?
                        <LoadingButton
                            startIcon={<SaveIcon/>}
                            loading
                            loadingPosition="start"
                            fullWidth
                            variant="contained">
                            Submit
                        </LoadingButton> :
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={submitHandler}
                        >
                            Submit
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}
