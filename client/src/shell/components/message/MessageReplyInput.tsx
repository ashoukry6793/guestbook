import "./MessageReplyInput.css"
import {Button, TextField} from "@mui/material";
import {BaseSyntheticEvent, useState} from "react";

interface Props {
    onReplyHandler: (replyMessage: string) => void;
    onCancelReplyHandler: () => void;
}

function MessageReplyInput(props: Props) {
    const [reply, setReply] = useState('');

    function replyHandler() {
        props.onReplyHandler(reply);
        setReply('');
    }

    function updateReplyHandler(event: BaseSyntheticEvent) {
        setReply(event.target.value);
    }

    return (
        <div className="message-reply-input">
            <div className="message-reply-input__reply">
                <TextField
                    variant="outlined"
                    label="What are your thoughts"
                    value={reply}
                    onInput={updateReplyHandler}
                />
            </div>
            <div className="message-reply-input__actions">
                <Button size="small" variant="outlined" onClick={props.onCancelReplyHandler}>Cancel</Button>
                <Button size="small" variant="contained" onClick={replyHandler}>Reply</Button>
            </div>
        </div>
    );
}

export default MessageReplyInput;
