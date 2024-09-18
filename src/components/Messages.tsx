import { useEffect, useRef } from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { useMessages } from '../states/useMessages';

const Messages = () => {
    const { messages, activeUser } = useMessages();

    const sortedMessages = [...messages]
        .filter(msg => msg.to === activeUser || msg.from === activeUser)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const shouldShowDate = (currentFrom: string, previousFrom: string) => {
        return currentFrom !== previousFrom;
    };

    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column h-100 p-3">
                <ListGroup variant="flush" className="flex-grow-1 overflow-auto p-0" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    {sortedMessages.map((msg, index) => {
                        const showDate = index === 0 || shouldShowDate(msg.from || '', sortedMessages[index - 1].from || '');
                        return (
                            <ListGroup.Item
                                key={index}
                                className={`w-100 mb-2 d-flex border-0 ${msg.from === activeUser ? 'justify-content-start' : 'justify-content-end'}`}
                                style={{
                                    padding: '0',
                                }}
                            >
                                <div className="d-flex flex-column">
                                    {showDate && (
                                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                                            {new Date(msg.date).toLocaleString()}
                                        </div>
                                    )}
                                    <div
                                        className={`p-2 ${msg.from === activeUser ? 'bg-light' : 'bg-info'}`}
                                        style={{
                                            borderRadius: '0.5rem',
                                            wordWrap: 'normal',
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            </ListGroup.Item>
                        );
                    })}
                    {/* Пустой элемент, чтобы прокрутка была внизу */}
                    <div ref={messagesEndRef} />
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default Messages;
