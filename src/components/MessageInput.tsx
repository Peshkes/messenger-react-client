import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Message, useMessages } from '../states/useMessages';
import { useSocket } from '../states/useSocket';
import { useUserList } from "../states/useUserList.ts";

const MessageInput = () => {
    const [messageText, setMessageText] = useState('');
    const { socket } = useSocket();
    const { activeUser, addMessage } = useMessages();
    const { username } = useUserList();

    useEffect(() => {
        if (!socket) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [socket, messageText]);

    const handleSubmit = () => {
        if (socket && activeUser && messageText.trim()) {
            const message: Message = {
                from: username ? username : 'Anonymous',
                to: activeUser,
                date: new Date(),
                text: messageText,
            };

            socket.send(JSON.stringify({ type: 'MESSAGE', message: message }));
            setMessageText('');
            addMessage(message);
        }
    };

    return (
        <Form className="mt-3 d-flex gap-3" onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <Form.Control
                type="text"
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
            />
            <Button variant="primary" type="submit" className="h-100">
                Send
            </Button>
        </Form>
    );
};

export default MessageInput;
