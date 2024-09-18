import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { Card } from 'react-bootstrap';
import {useMessages} from "../states/useMessages.ts";

const ChatWindow = () => {
    const { activeUser } = useMessages();
    return (
        <Card className="w-100 h-100">
            <Card.Body>
                {activeUser ?
                    <div className="d-flex flex-column h-100">
                        <Messages/>
                        <MessageInput/>
                    </div> :
                    <div className="d-flex justify-content-center align-items-center h-100">Select a user to start messaging</div>
                }
            </Card.Body>
        </Card>
    );
};

export default ChatWindow;
