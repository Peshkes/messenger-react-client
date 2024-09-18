import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useAuthenticate } from '../states/useAuthenticate';
import {useUserList} from "../states/useUserList.ts";

const Registration = () => {
    const [secretCode, setSecretCode] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [error, setError] = useState('');

    const {setAuthenticated} = useAuthenticate();
    const {setUsername} = useUserList();

    useEffect(() => {
        const savedString = localStorage.getItem('savedString');
        const savedUsername = localStorage.getItem('savedUsername');

        if (savedString) {
            setSecretCode(savedString);
            setAxiosAuthHeader(savedString);
        }

        if (savedUsername) {
            setUsernameInput(savedUsername);
        }
    }, []);

    const setAxiosAuthHeader = (secretString: string) => {
        const encodedString = btoa(`${secretString}:`); // Кодируем строку в base64
        axios.defaults.headers.common['Authorization'] = `Basic ${encodedString}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Очищаем сообщение об ошибке

        if (secretCode.trim() === '' || usernameInput.trim() === '') {
            setError('Please enter both username and secret code.');
            return;
        }

        localStorage.setItem('savedString', secretCode);
        localStorage.setItem('savedUsername', usernameInput);
        setAxiosAuthHeader(secretCode);

        axios.post('http://localhost:3000/register', { username: usernameInput, secretCode })
            .then((response) => {
                setUsername(usernameInput);
                setAuthenticated(true);
                console.log('Response:', response.data);
            })
            .catch((error) => {
                setAuthenticated(false);

                if (error.response) {
                    const status = error.response.status;
                    const message = error.response.data.message || 'An error occurred.';

                    if (status === 400 && message === 'Username already taken.') {
                        setError('Username is already taken. Please choose a different one.');
                    } else {
                        setError(message);
                    }
                } else {
                    setError('Network error. Please try again.');
                }

                console.error('Error:', error.response?.data || error.message);
            });
    };

    return (
        <Row className="justify-content-md-center">
            <h2 className="text-center my-4">Enter Secret Code</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        isInvalid={!!error}
                    />
                </Form.Group>
                <Form.Group controlId="formSecretCode">
                    <Form.Label>Secret Code</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter secret code"
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                        isInvalid={!!error}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>
        </Row>
    );
};

export default Registration;
