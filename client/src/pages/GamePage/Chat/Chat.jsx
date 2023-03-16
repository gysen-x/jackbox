import React, { useEffect, useRef, useState } from 'react';
import style from './css/style.module.css';
import Messages from './Messages/Messages';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomInput from '../../../components/CustomInput/CustomInput';

function Chat() {
  const [message, setMessage] = useState({ text: '', time: null });
  const [allMessages, setAllMessages] = useState([]);

  const currentTime = new Date(Date.now());
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  //   const seconds = currentTime.getSeconds();

  const scroll = useRef(null);
  const handleChange = (event) => {
    setMessage({
      ...message,
      [event.target.name]: event.target.value,
      time: `${hours < 10 ? (`0${hours}`) : (hours)}:${minutes < 10 ? (`0${minutes}`) : (minutes)}`,
    });
  };

  useEffect(
    () => {
      if (scroll.current) {
        scroll.current.scrollTop = scroll.current.scrollHeight;
      }
    },
    [allMessages],
  );

  console.log(message);

  const onSubmitHandle = (event) => {
    event.preventDefault();
    if (message.text !== '') {
      setAllMessages([...allMessages, message]);
      setMessage({ text: '' });
    }
  };
  console.log(allMessages);

  return (
    <div className={style.chatDiv}>
      <div className={style.header}>
        <div className={style.title}>Online-chat</div>
      </div>
      <div ref={scroll} className={style.allMessages}>
        {allMessages.map((message1) => (message1.text !== '' ? (
          <Messages key={message.text} message={message} />) : ('')))}
      </div>
      <form onSubmit={onSubmitHandle} className={style.messageInputForm}>
        <CustomInput
          className={style.chat__input}
          value={message.text}
          name="text"
          onChange={handleChange}
        />
        <CustomButton type="submit" color="#fe9e84" title="Send" />
      </form>
    </div>
  );
}

export default Chat;
