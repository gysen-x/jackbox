import React from 'react';
import style from './css/style.module.css'

const Messages = ({message}) => {
    const currentTime = new Date(Date.now())
    console.log(currentTime)
    return (
        <div className={style.newMessage}>
            <div className={style.eachMessage}>
                {message.text}
            </div>
            <div className={style.time}>
                {message.time}
            </div>
        </div>
    );
};

export default Messages;