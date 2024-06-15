import React from 'react'

function Message({ message: { message, name } }) {
    return (
        <li><span className="name">{name}:</span>{message}</li>
    )
}

export default Message