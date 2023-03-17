import React from 'react';
import CustomButton from '../../../../components/CustomButton/CustomButton';

import style from './style.module.css';

export default function VoteGamePage() {
  return (
    <div className={style.voteGamePage__container}>
      <h2 className={style.voteGamePage__title}>Vote</h2>
      <h2 className={style.voteGamePage__setup}>
        Ребенок не хочет есть мясо. Чем его можно заменить?
      </h2>
      <div className={style.voteGamePage__wrapper}>
        <div className={style.voteGamePage__box}>
          <div className={style.voteGamePage__punchBox}>
            <h4 className={style.voteGamePage__punch}>Собакой</h4>
          </div>
          <CustomButton
            title="Vote"
            color="rgb(254, 158, 132)"
          />
        </div>
        <div className={style.voteGamePage__box}>
          <div className={style.voteGamePage__punchBox}>
            <h4 className={style.voteGamePage__punch}>Селедкой под шубой</h4>
          </div>
          <CustomButton
            title="Vote"
            color="rgb(254, 158, 132)"
          />
        </div>
      </div>
    </div>

  );
}
