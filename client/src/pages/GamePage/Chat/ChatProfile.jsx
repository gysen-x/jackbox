import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import style from './css/style.module.css';
import Messages from './Messages/Messages';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomInput from '../../../components/CustomInput/CustomInput';

const SERVER_URL = 'http://localhost:3000';

function ChatProfile({ id }) {
  const user = useSelector((store) => store.user);
  const token = localStorage.getItem('token');
  const socketRef = useRef(null);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const scroll = useRef(null);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    socketRef.current = io(SERVER_URL);
    socketRef.current.emit('connection');
    fetch(
      `/users/${id}/messages`,
      {
        headers: {
          Authentication: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json())
      .then((data) => setAllMessages(data))
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(
    () => {
      if (scroll.current) {
        scroll.current.scrollTop = scroll.current.scrollHeight;
      }
      if (socketRef.current) {
        socketRef.current.on('newPrivateMessage', ({ id: ourId, senderId, messageNew }) => {
          if (user.userid === ourId || user.userid === senderId) {
            setAllMessages([...allMessages, messageNew]);
          }
        });
      }
    },
    [allMessages],
  );

  const onSubmitHandle = (event) => {
    event.preventDefault();
    if (message) {
      socketRef.current.emit('sendPrivateMessage', { id, token, message });
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

export default ChatProfile;
