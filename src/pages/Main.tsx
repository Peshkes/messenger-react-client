import {useEffect} from 'react';
import {useSocket} from '../states/useSocket';
import {useUserList} from "../states/useUserList.ts";
import UserList from "../components/UserList.tsx";
import ChatWindow from "../components/ChatWindow.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {useMessages} from "../states/useMessages.ts";

const Main = () => {
    const {setSocket} = useSocket();
    const {username, setUserList} = useUserList();
    const {addMessage} = useMessages();

    useEffect(() => {
        const ws = new WebSocket(`wss://${window.location.host}/?username=${username}`);

        ws.onopen = () => {
            console.log('WebSocket connected');
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case 'USER_LIST':
                    setUserList(data.users);
                    break;
                case 'MESSAGE':
                    console.log('Received message:', data.message);
                    addMessage(data.message);
                    break;
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(ws);
        return () => {
            if (ws) ws.close();
        };
    }, []);


    return (
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col md={8} className="d-flex align-items-center">
                    <ChatWindow/>
                </Col>
                <Col md={4} className="d-flex align-items-center">
                    <UserList/>
                </Col>
            </Row>
        </Container>
    );
};

export default Main;
