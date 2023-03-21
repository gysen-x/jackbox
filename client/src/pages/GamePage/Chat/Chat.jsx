import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import style from './css/style.module.css';
import Messages from './Messages/Messages';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomInput from '../../../components/CustomInput/CustomInput';

function Chat({ socketRef }) {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const theme = localStorage.getItem('theme');
  const [styles, setStyles] = useState(theme);
  const [showEmoji, setShowEmoji] = useState(false);

  const scroll = useRef(null);
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const emojiTheme = theme === 'light' ? Theme.LIGHT : Theme.DARK;

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    setStyles(theme);
  }, [theme]);

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
  }, [allMessages, showEmoji]);

  const onSubmitHandle = (event) => {
    event.preventDefault();
    setShowEmoji(false);
    if (message) {
      socketRef.current.emit('sendMessage', { id, token, message });
      setMessage('');
    }
  };

  const handleShowEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleOnEmoji = (emoji) => {
    setMessage(message + emoji.emoji);
  };

  return (
    <div className={style.chatDiv}>
      <div className={style.header}>
        <div className={style.title}>Room chat</div>
      </div>
      <div ref={scroll} className={styles === 'light' ? (style.allLightMessages) : (style.allMessages)}>
        {allMessages.join()
          ? (allMessages.map((msg) => (msg.text !== '' ? (
            <Messages key={msg.id} message={msg} />) : (''))))
          : <p style={{ textAlign: 'center' }}>Сообщений нет</p>}
        {showEmoji
                    && (
                    <div className={style.emojiTable}>
                      <EmojiPicker onEmojiClick={handleOnEmoji} width="300px" height="400px" theme={emojiTheme} />
                    </div>
                    )}
      </div>
      <form onSubmit={onSubmitHandle} className={style.messageInputForm}>
        <CustomInput
          className={style.chat__input}
          value={message}
          name="text"
          onChange={handleChange}
        />
        <EmojiEmotionsIcon fontSize="large" onClick={handleShowEmoji} />
        <CustomButton type="submit" color="#fe9e84" title="Send" />
      </form>
    </div>
  );
}

export default Chat;
