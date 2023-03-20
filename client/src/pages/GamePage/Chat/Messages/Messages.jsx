import React from 'react';
import { useSelector } from 'react-redux';
import style from './css/style.module.css';

function Messages({ id, message }) {
  const currentTime = new Date(message.time);
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const user = useSelector((store) => store.user);
  console.log(user);
  console.log(message.user.id);

  return (
    user.userid === message.user.id ? (
      <div className={style.message}>
        <p className={style.message__ourUsername}>{message.user.login}</p>
        <div className={style.ourNewMessage}>
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
    ) : (
      <div className={style.message}>
        <p className={style.message__senderUsername}>{message.user.login}</p>
        <div className={style.senderNewMessage}>
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
    )
  );
}

export default Messages;
