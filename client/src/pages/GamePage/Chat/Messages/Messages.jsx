import React from 'react';
import style from './css/style.module.css'

const Messages = ({message}) => {
    return (
        <div className={style.eachMessage}>
            {message}
        </div>
    );
};

export default Messages;