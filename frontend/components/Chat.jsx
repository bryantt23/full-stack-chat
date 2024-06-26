import React, { useState, useEffect, useRef } from 'react';
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
            setMessages(prev => [...prev, JSON.parse(event.data)]);
            setTimeout(scrollToBottom, 100);
        }
    });

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("anonymous");
    const [loading, setLoading] = useState(false);

    const focusRef = useRef(null);
    const messageListRef = useRef(null);

    async function delay() {
        return new Promise(resolve => {
            setTimeout(resolve, 2000)
        })
    }

    async function fetchData(limit = 7, beforeId = null, prepend = false) {
        setLoading(true);
        const params = { limit };
        if (beforeId) {
            params.beforeId = beforeId;
        }
        const newMessages = await getMessages(params);
        if (prepend) {
            await delay()
            setMessages(prev => {
                const currentHeight = messageListRef.current.scrollHeight;
                const updatedMessages = [...newMessages, ...prev];
                setTimeout(() => {
                    messageListRef.current.scrollTop = messageListRef.current.scrollHeight - currentHeight;
                }, 100);
                return updatedMessages;
            });
        } else {
            setMessages(newMessages);
            scrollToBottom();
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleScroll = async (e) => {
        if (e.currentTarget.scrollTop === 0) {
            console.log("on top!");
            const firstMessageId = messages[0]?._id;
            if (firstMessageId) {
                await fetchData(7, firstMessageId, true);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMessage = { name, message };
        sendMessage(JSON.stringify(newMessage));
    };

    const scrollToBottom = () => {
        focusRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className='chat-container'>
            <h1>Chat Application</h1>

            <div className="middle">
                <div className="message-list-container">
                    <ul className="message-list" ref={messageListRef} onScroll={handleScroll}>
                        {loading && <div className="spinner" />}
                        {messages.map((message) => (
                            <Message key={message._id} message={message} />
                        ))}
                        <div ref={focusRef} />
                    </ul>
                </div>
                <div className='form-container'>
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
