import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './css/style.module.css';
import Messages from './Messages/Messages';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomInput from '../../../components/CustomInput/CustomInput';

function Chat() {
  // +user
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const scroll = useRef(null);
  const { id } = useParams();
  console.log(id);

  // const socketRef = useRef(null);
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  console.log(message);

  //= ===============================
  useEffect(() => {
    const response = fetch(`/rooms/${id}/messages`);
    response
      .then((res) => res.json())
      .then((data) => setAllMessages(data))
      .catch((error) => console.log(error));
  }, []);
  //= ===============================

  useEffect(
    () => {
      if (scroll.current) {
        scroll.current.scrollTop = scroll.current.scrollHeight;
      }
    },
    [allMessages],
  );

  const onSubmitHandle = (event) => {
    event.preventDefault();
    if (message.text !== '') {
      setAllMessages([...allMessages, {
        id: 1, text: message, user: 'admin', time: new Date(),
      }]);
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
        {allMessages.map((msg) => (msg.text !== '' ? (
          <Messages key={msg.id} message={msg} />) : ('')))}
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
