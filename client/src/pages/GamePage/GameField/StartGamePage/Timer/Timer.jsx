import React, {useEffect, useState} from 'react';
import style from './css/style.module.css';

export const Timer = () => {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        let counter;
        if (timer === 0) {
            setTimer(false);
        }
        if (timer > 0) {
            counter = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        }
        return () => clearInterval(counter);
    }, [timer]);

    return (
        <div className={style.timer}>
            {timer ? (
                <span>Time to get ready 00:{timer >= 10 ? timer : '0' + timer}</span>
            ) : (
                <span>Let`s Go!</span>
            )}
        </div>
    );
};