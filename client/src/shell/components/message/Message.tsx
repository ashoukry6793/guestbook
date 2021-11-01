import "./Message.css";
import MessageReply from "./MessageReply";
import MessageReplyInput from "./MessageReplyInput";
import {useState} from "react";
import {Button} from "@mui/material";

interface Props {
    authorName: string;
    content: string;
    replies: {
        id: string;
        authorName: string;
        content: string;
    }[]
    onReplyHandler: (replyMessage: string) => void;
}

function nameInitials(name: string): string {
    return name.split(' ').map(name => name[0]).join('').toUpperCase()
}

function Message(props: Props) {
    const [showReplies, setShowReplies] = useState(false);
    const [showReply, setShowReply] = useState(false);

    function showRepliesHandler() {
        setShowReplies(!showReplies);
    }

    function showReplyHandler() {
        setShowReply(!showReply);
    }

    const onCancelReplyHandler = () => {
        setShowReply(false);
    }

    function onReplyHandler(replyMessage: string) {
        setShowReplies(true)
        props.onReplyHandler(replyMessage);
    }

    return (
        <div className="message">
            <div className="message__author">
                <div className="message__author__profile-pic">
                    {nameInitials(props.authorName)}
                </div>
                <div className="message__author__info">
                    <p className="message__author_info__name">{props.authorName}</p>
                </div>
            </div>
            <p className="message__author-message">
                {props.content}
            </p>
            <div className="message__actions">
                <Button size="small" variant="outlined" onClick={showRepliesHandler}>Replies</Button>
                <Button size="small" variant="contained" onClick={showReplyHandler}>Reply</Button>
            </div>
            {showReply && (
                <div className="message__reply-input">
                    <MessageReplyInput
                        onReplyHandler={onReplyHandler}
                        onCancelReplyHandler={onCancelReplyHandler}
                    />
                </div>
            )}
            {showReplies && (
                <div className="message__replies">
                    {props.replies.map(reply => {
                        return (
                            <MessageReply
                                key={reply.id}
                                authorName={reply.authorName}
                                content={reply.content}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}


export default Message;
