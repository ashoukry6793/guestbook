import "./MessageReply.css";

interface Props {
    authorName: string;
    content: string;
}

function nameInitials(name: string): string {
    return name.split(' ').map(name => name[0]).join('').toUpperCase()
}


function MessageReply(props: Props) {
    return (
        <div className="message-reply">
            <div className="message-reply__author">
                <div className="message__author__profile-pic">
                    {nameInitials(props.authorName)}
                </div>
                <div className="message-reply__author__info">
                    <p className="message-reply__author_info__name">{props.authorName}</p>
                </div>
            </div>
            <p className="message-reply__author-message">
                {props.content}
            </p>
        </div>
    );
}

export default MessageReply;
