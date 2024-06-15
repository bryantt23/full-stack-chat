import React from 'react'
import Message from './Message';

function Chat() {
    const messages = [
        { id: 1, name: "John", message: "Hi" },
        { id: 2, name: "Jane", message: "Hello how are you?" },
        { id: 3, name: "John", message: "I am hungry" }
    ];

    return (
        <div>
            <h1>Chat Application</h1>

            <ul>
                {messages.map(message => <Message key={message.id} message={message} />)}
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