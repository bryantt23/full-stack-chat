import React, { useState, useEffect } from 'react'
import Message from './Message';
import { getMessages, sendMessage } from '../services/messages';

function Chat() {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [name, setName] = useState("anonymous")

    async function fetchData() {
        const messages = await getMessages()
        setMessages(messages)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await sendMessage(name, message)
        fetchData()
    }

    return (
        <div>
            <h1>Chat Application</h1>

            <ul>
                {messages.map(message => <Message key={message._id} message={message} />)}
            </ul>

            <form onSubmit={handleSubmit}>
                <label>Enter name</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <label>Enter text</label>
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />

                <button type="submit">Send Message</button>
            </form>
        </div>
    )
}

export default Chat