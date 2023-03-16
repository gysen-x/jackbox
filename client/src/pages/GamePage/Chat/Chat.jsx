import React, {useEffect, useRef, useState} from 'react';
import style from './css/style.module.css';
import Messages from './Messages/Messages';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomInput from '../../../components/CustomInput/CustomInput';
import {useParams} from "react-router-dom";

function Chat() {
    // +user
    const [message, setMessage] = useState({text: '', time: null, user: null});
    const [allMessages, setAllMessages] = useState([]);

    const currentTime = new Date(Date.now());
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const scroll = useRef(null);
    const id = useParams()

    const socketRef = useRef(null);
    const handleChange = (event) => {
        setMessage({
            ...message,
            [event.target.name]: event.target.value,
            time: `${hours < 10 ? (`0${hours}`) : (hours)}:${minutes < 10 ? (`0${minutes}`) : (minutes)}`,
        });
    };


    //================================
    useEffect(() => {
        const response = fetch(`/rooms/${id}/messages`)
        response
            .then((res) => res.json())
            .then((data) => setAllMessages(data))
            .catch((error) => console.log(error))
    }, [])
    //================================

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
            setMessage({text: ''});
        }
    };

    return (
        <div className={style.chatDiv}>
            <div className={style.header}>
                <div className={style.title}>Online-chat</div>
            </div>
            <div ref={scroll} className={style.allMessages}>
                {allMessages.map((message1) => (message1.text !== '' ? (
                    <Messages key={message.text} message={message}/>) : ('')))}
            </div>
            <form onSubmit={onSubmitHandle} className={style.messageInputForm}>
                <CustomInput
                    className={style.chat__input}
                    value={message.text}
                    name="text"
                    onChange={handleChange}
                />
                <CustomButton type="submit" color="#fe9e84" title="Send"/>
            </form>
        </div>
    );
}

export default Chat;
