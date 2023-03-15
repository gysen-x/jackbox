import React, {useState} from 'react';
import style from './css/style.module.css'
import Messages from "./Messages/Messages";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";

const Chat = () => {
    const [message, setMessage] = useState({})
    const [allMessages, setAllMessages] = useState([])

    const currentTime = new Date(Date.now())
    const handleChange = (event) => {
        setMessage({
            ...message,
            [event.target.name]: event.target.value,
            time: `${currentTime.getHours()}:${currentTime.getMinutes()}`
        })
    }

    console.log(message)

    const onSubmitHandle = (event) => {
        event.preventDefault()
        if (message.text !== '') {
            setAllMessages([...allMessages, message])
            setMessage({text: ''})
        }
    }

    console.log(allMessages)

    return (
        <div className={style.chatDiv}>
            <div className={style.header}>
                <div className={style.title}>Это - Header</div>
            </div>
            <div className={style.allMessages}>
                {allMessages.map((message) => message.text !== '' ? (
                    <Messages key={message.text} message={message}/>) : (<></>))}
            </div>
            <form onSubmit={onSubmitHandle} className={style.messageInputForm}>
                <CustomInput value={message.text} name='text' onChange={handleChange}/>
                <CustomButton type='submit' color='#fe9e84' title="Отправить"/>
            </form>
        </div>
    );
};

export default Chat;