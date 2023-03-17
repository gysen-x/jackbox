import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './css/style.module.css';
import Messages from './Messages/Messages';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomInput from '../../../components/CustomInput/CustomInput';

function Chat({ socketRef }) {
  console.log('socketRef: ', socketRef.current);

  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const scroll = useRef(null);
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const response = fetch(`/rooms/${id}/messages`);
    response
      .then((res) => res.json())
      .then((data) => setAllMessages(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }
    if (socketRef.current) {
      socketRef.current.on('newMessage', ({ id: roomId, messageNew }) => {
        if (id === roomId) {
          setAllMessages([...allMessages, messageNew]);
        }
      });
    }
  }, [allMessages]);

  const onSubmitHandle = (event) => {
    event.preventDefault();
    if (message) {
      socketRef.current.emit('sendMessage', { id, token, message });
      setMessage('');
    }
  };
  return (
    <div className={style.chatDiv}>
      <div className={style.header}>
        <div className={style.title}>Online-chat</div>
      </div>
      <div ref={scroll} className={style.allMessages}>
        {allMessages.join()
          ? (allMessages.map((msg) => (msg.text !== '' ? (
            <Messages key={msg.id} message={msg} />) : ('')))) : <p style={{ textAlign: 'center' }}>Сообщений нет</p>}
      </div>
      <form onSubmit={onSubmitHandle} className={style.messageInputForm}>
        <CustomInput
          className={style.chat__input}
          value={message}
          name="text"
          onChange={handleChange}
        />
        <CustomButton type="submit" color="#fe9e84" title="Send" />
      </form>
    </div>
  );
}

export default Chat;
