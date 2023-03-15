import React, {useState} from 'react';
import style from './css/style.module.css'
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {Timer} from "./Timer/Timer";

const StartGamePage = () => {
    const [ready, setReady] = useState(false)
    const [allReady, setAllReady] = useState([])


    const changeReadyStatus = () => {
        setReady(true)
        setAllReady([...allReady, ready])
    }

    return (
        <div className={style.startGamePage}>
            <div className={style.roomName}>Room name:</div>
            <div className={style.startButton}>
                <CustomButton handleOnClick={changeReadyStatus} type='click' title='Ready'/>
            </div>
            <Timer/>
        </div>
    );
};

export default StartGamePage;