import React from 'react'

function Message({ message: { message, name, createdAt } }) {
    const formattedDate = new Date(createdAt).toLocaleString();
    return (
        <li><span className="name">{name}:</span>{message} {formattedDate}</li>
    )
}

export default Message