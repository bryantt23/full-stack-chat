import React, { useState, useEffect } from 'react';
import Message from './Message';
import { getMessages } from '../services/messages';
import useWebSocket from 'react-use-websocket';
import "./Chat.css"
const WS_URL = "ws://localhost:3000";

function Chat() {
    const { sendMessage } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        onClose: () => {
            console.log('WebSocket connection closed.');
        },
        onError: (error) => {
            console.error('WebSocket error:', error);
        },
        onMessage: (event) => {
            console.log('WebSocket message received:', event.data);
            setMessages(prev => [...prev, JSON.parse(event.data)])
        }
    });

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("anonymous");

    async function fetchData() {
        const messages = await getMessages();
        setMessages(messages);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMessage = { name, message };
        sendMessage(JSON.stringify(newMessage))
    };

    return (
        <div className='chat-container'>
            <h1>Chat Application</h1>

            <div className="middle">
                <div>
                    <ul className="message-list">
                        {messages.map((message) => (
                            <Message key={message._id} message={message} />
                        ))}
                    </ul>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Enter name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Enter text</label>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />

                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;
