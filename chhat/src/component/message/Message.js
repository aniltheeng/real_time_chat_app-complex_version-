import React from 'react'
import "./Message.css";


const Message = ({ user, message, classss }) => {
    if (user) {
        return (
            <div className={`messageBox ${classss}`}  >
                {`${user}: ${message}`}
            </div>
        )
    }
    else {


        return (
            <div className={`messageBox ${classss}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message
