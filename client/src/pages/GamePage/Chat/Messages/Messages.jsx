import React from 'react';
import style from './css/style.module.css';

function Messages({ message }) {
  const currentTime = new Date(message.time);
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  return (
    <div className={style.message}>
      <p className={style.message__username}>{message.user}</p>
      <div className={style.newMessage}>
        <div className={style.eachMessage}>
          {message.text}
        </div>
        <div className={style.time}>
          {hours < 10 ? (`0${hours}`) : (hours)}
          :
          {minutes < 10 ? (`0${minutes}`) : (minutes)}
        </div>
      </div>
    </div>
  );
}

export default Messages;
