import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './css/style.module.css';

function Messages({ message }) {
  const currentTime = new Date(message.time);
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const user = useSelector((store) => store.user);
  const theme = localStorage.getItem('theme');
  const [styles, setStyles] = useState(theme);

  useEffect(() => {
    setStyles(theme);
  }, [theme]);

  console.log(message);

  return (
    user.userid === message.user.id ? (
      <div className={style.message}>
        <p className={style.message__senderUsername}>{message.user.login}</p>
        <div className={style.senderNewMessage}>
          <div className={styles === 'light' ? (style.leftLight) : (style.eachSenderMessage)}>
            {message.text}
          </div>
          <div className={style.senderTime}>
            {hours < 10 ? (`0${hours}`) : (hours)}
            :
            {minutes < 10 ? (`0${minutes}`) : (minutes)}
          </div>
        </div>
      </div>
    ) : (
      <div className={style.message}>
        <p className={style.message__ourUsername}>{message.user.login}</p>
        <div className={style.ourNewMessage}>
          <div className={styles === 'light' ? (style.rightLight) : (style.eachMessage)}>
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
