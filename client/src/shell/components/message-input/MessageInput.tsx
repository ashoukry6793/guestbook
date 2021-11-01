import "./MessageInput.css";
import {Button, TextField} from "@mui/material";
import {BaseSyntheticEvent, useState} from "react";

interface Props {
    onCancelHandler: () => void;
    onSaveHandler: (message: string) => void;
}

export default function MessageInput(props: Props) {
    const [message, setMessage] = useState('');

    function updateMessageHandler(event: BaseSyntheticEvent) {
        setMessage(event.target.value);
    }

    function saveHandler() {
        props.onSaveHandler(message);
    }

    return (
        <div className="message-input">
            <div className="message-input__message">
                <TextField
                    variant="outlined"
                    label="Message"
                    value={message}
                    fullWidth
                    onInput={updateMessageHandler}
                />
            </div>
            <div className="message-input__actions">
                <Button size="small" variant="outlined" onClick={props.onCancelHandler}>Cancel</Button>
                <Button size="small" variant="contained" onClick={saveHandler}>Save</Button>
            </div>
        </div>
    )
}
