import React from 'react';
import style from './css/style.module.css'
import Messages from "./Messages/Messages";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";

const Chat = () => {
    return (
        <div>
            <div className={style.header}>
                <div className={style.title}></div>
            </div>
            <div className={style.allMessages}>
                <Messages/>
            </div>
            <form className={style.messageInputForm}>
                <CustomInput/>
                <CustomButton type='submit' color='#fe9e84' title="Отправить"/>
            </form>
        </div>
    );
};

export default Chat;