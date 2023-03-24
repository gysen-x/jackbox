import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import style from './css/style.module.css';
import Messages from './Messages/Messages';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomInput from '../../../components/CustomInput/CustomInput';
import url from '../../../url';

function ChatProfile({
  id, name, hadleCloseChat, socketRef,
}) {
  const user = useSelector((store) => store.user);
  const token = localStorage.getItem('token');
  const theme = localStorage.getItem('theme');
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [styles, setStyles] = useState(theme);
  const [showEmoji, setShowEmoji] = useState(false);

  const emojiTheme = theme === 'light' ? Theme.LIGHT : Theme.DARK;

  useEffect(() => {
    setStyles(theme);
  }, [theme]);

  const scroll = useRef(null);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    fetch(
      `${url}/users/${id}/messages`,
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
          if ((user.userid === ourId || user.userid === senderId)
                        && (id === ourId || id === senderId)) {
            setAllMessages([...allMessages, messageNew]);
          }
        });
      }
    },
    [allMessages, showEmoji],
  );

  const onSubmitHandle = (event) => {
    event.preventDefault();
    setShowEmoji(false);
    if (message) {
      socketRef.current.emit('sendPrivateMessage', { id, token, message });
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
        <div className={style.title}>
          Chat with:
          {' '}
          {name}
          <ClearRoundedIcon
            onPointerDown={() => {
              hadleCloseChat();
            }}
            fontSize="large"
            className={style.closeChat}
          />
        </div>
      </div>
      <div ref={scroll} className={styles === 'light' ? (style.allLightMessages) : (style.allMessages)}>
        {allMessages.join()
          ? (allMessages.map((msg) => (msg.text !== '' ? (
            <Messages id={id} key={msg.id} message={msg} />) : (''))))
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

export default ChatProfile;
