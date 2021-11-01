import Message from "../../components/message";
import "./Home.css"

import AuthTokenRepoImpl from "../../repositories/AuthTokenRepoImpl";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {routePaths} from "../../../core/routes/routes";
import HomePresenter from "../../../core/presenters/home/HomePresenter";
import MessageRepoImpl from "../../repositories/MessageRepoImpl";
import {notificationService} from "../../../core/services/NotificationService";
import HomeAction from "../../../core/presenters/home/HomeAction";
import {Button} from "@mui/material";
import MessageInput from "../../components/message-input/MessageInput";

function Home() {
    const history = useHistory();
    const [shouldShowHomePage, setShouldShowHomePage] = useState(false);
    const [shouldMessageInput, setShouldMessageInput] = useState(false);
    const [presenter] = useState(new HomePresenter(new MessageRepoImpl(), notificationService));
    const [state, setState] = useState(presenter.state);

    useEffect(() => {
        checkAuthToken().then((isAuthTokenValid) => {
            if(!isAuthTokenValid) {
                history.push(routePaths.LOGIN_VIEW_PATH);
            } else {
                setShouldShowHomePage(true);
            }
        })
    }, []);

    useEffect(() => {
        initialize();
    }, []);

    async function checkAuthToken() {
        const token = await new AuthTokenRepoImpl().getToken();
        return !!token;
    }

    async function initialize() {
        presenter.dispatch(new HomeAction("INITIALIZE"), (newState) => {
            setState(newState);
        })
    }

    const saveNewMessageHandler = (message: string) => {
        presenter.dispatch(new HomeAction("POST_MESSAGE", {
            messageContent: message
        }), (newState) => {
            setShouldMessageInput(false);
            setState(newState);
        })
    }

    function addMessageHandler() {
        setShouldMessageInput(!shouldMessageInput);
    }

    function cancelAddMessageHandler() {
        setShouldMessageInput(false);
    }

    const onReplyHandler = (replyMessage: string, messageId: string) => {
        presenter.dispatch(new HomeAction("REPLY_TO_MESSAGE", {
            replyMessage,
            messageId
        }), (newState) => {
            setState(newState);
        })
    }

    if (shouldShowHomePage) {
        return (
            <div className="home">
                <nav className="home__nav-bar">
                    <h1>GUESTBOOK</h1>
                </nav>
                <main>
                    <div className="home__messages">
                        <div className="home__messages__actions">
                            <Button variant="contained" onClick={addMessageHandler}>Add Message</Button>
                        </div>
                        {shouldMessageInput && (
                            <MessageInput
                                onSaveHandler={saveNewMessageHandler}
                                onCancelHandler={cancelAddMessageHandler}
                            />
                        )}
                        {state.data.messages.map(message => {
                                return (
                                    <Message
                                        key={message.id}
                                        authorName={message.authorName}
                                        content={message.content}
                                        replies={message.replies}
                                        onReplyHandler={(replyMessage) => {
                                            onReplyHandler(replyMessage, message.id)
                                        }}
                                    />
                                )
                            })
                        }
                    </div>
                </main>
            </div>
        )
    }
    return (
        <div></div>
    )
}

export default Home;
