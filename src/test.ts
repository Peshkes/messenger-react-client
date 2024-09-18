// import { useState, useEffect, useRef } from 'react';
// import './App.css';
//
// export type User = {
//     username: string;
// }
//
// const App = () => {
//     const [ws, setWs] = useState<WebSocket | null>(null);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [registered, setRegistered] = useState(false);
//     const [users, setUsers] = useState<User[]>([]);
//     const [message, setMessage] = useState('');
//     const [currentRecipient, setCurrentRecipient] = useState<User | null>(null);
//     const messageRef = useRef<HTMLDivElement>(null);
//
//     useEffect(() => {
//         if (registered) {
//             const socket = connectWebSocket();
//             return () => socket.close();
//         }
//     }, [registered]);
//
//     const connectWebSocket = () => {
//         const socket = new WebSocket('ws://localhost:3000');
//
//         socket.onopen = () => {
//             console.log('WebSocket connected');
//             setWs(socket);
//             // Send registration message
//             socket.send(JSON.stringify({
//                 type: 'register',
//                 username,
//                 password
//             }));
//         };
//
//         socket.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//
//             if (data.type === 'userList') {
//                 setUsers(data.users);
//             } else if (data.type === 'message') {
//                 // Handle incoming messages
//                 const messageElement = document.createElement('div');
//                 messageElement.textContent = `${data.from}: ${data.message}`;
//                 if (messageRef.current)
//                     messageRef.current.appendChild(messageElement);
//             } else if (data.type === 'error') {
//                 alert(data.message);
//             } else if (data.type === 'success') {
//                 alert(data.message);
//             }
//         };
//
//         socket.onclose = () => {
//             console.log('WebSocket disconnected');
//         };
//
//         return socket;
//     };
//
//     const handleRegister = () => {
//         // Register via HTTP
//         fetch('http://localhost:3000/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Basic ' + btoa(username + ':' + password)
//             },
//             body: JSON.stringify({ username })
//         })
//             .then(response => {
//                 if (response.ok) {
//                     setRegistered(true);
//                 } else {
//                     alert('Failed to register');
//                 }
//             });
//     };
//
//     const handleSendMessage = () => {
//         if (currentRecipient && message && ws) {
//             ws.send(JSON.stringify({ type: 'message', recipient: currentRecipient.username, message }));
//             setMessage('');
//         }
//     };
//
//     const handleCall = () => {
//         if (currentRecipient && ws) {
//             ws.send(JSON.stringify({ type: 'call', recipient: currentRecipient.username }));
//         }
//     };
//
//     const handleVideoCall = () => {
//         if (currentRecipient && ws) {
//             ws.send(JSON.stringify({ type: 'videoCall', recipient: currentRecipient.username }));
//         }
//     };
//
//     const handleUserClick = (user: User) => {
//         setCurrentRecipient(user);
//     };
//
//     return (
//         <div className="App">
//             <h1>WebSocket Chat and Call</h1>
//     {!registered ? (
//             <div>
//                 <input
//                     type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Enter your username"
//         />
//         <input
//             type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Enter your password"
//         />
//         <button onClick={handleRegister}>Register</button>
//             </div>
//     ) : (
//         <div>
//             <h2>Users</h2>
//         <ul>
//         {users.map(user => (
//                 <li key={user.username} onClick={() => handleUserClick(user)}>
//         {user.username}
//         </li>
//     ))}
//         </ul>
//
//         <div>
//         <textarea
//             value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//         />
//         <button onClick={handleSendMessage}>Send</button>
//         </div>
//
//         <div>
//         <button onClick={handleCall}>Call</button>
//             <button onClick={handleVideoCall}>Video Call</button>
//     </div>
//
//     <div ref={messageRef} style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }} />
//     </div>
//     )}
//     </div>
// );
// };
//
// export default App;
