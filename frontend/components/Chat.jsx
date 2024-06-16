import React, { useState, useEffect } from 'react'
import Message from './Message';
import { getMessages } from '../services/messages';

function Chat() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await getMessages()
            setMessages(res)
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Chat Application</h1>

            <ul>
                {messages.map(message => <Message key={message._id} message={message} />)}
            </ul>

            <form>
                <label>Enter text</label>
                <input type="text" />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Chat