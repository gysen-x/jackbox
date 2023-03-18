import React from 'react';
import { Timer } from '../StartGamePage/Timer/Timer';
import style from './WaitingGamepage.module.css';

export default function WaitingGamepage() {
  return (
    <div className={style.WaitingGamepage__container}>
      <div className={style.WaitingGamepage__box}>
        <Timer />
      </div>
    </div>
  );
}
