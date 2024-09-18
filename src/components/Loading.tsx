import { Spinner, Container } from 'react-bootstrap';

const Loading = () => {
    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center position-fixed w-100 h-100 top-0 left-0"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 9999,
            }}>
            <Spinner animation="border" variant="primary" />
        </Container>
    );
};

export default Loading;
