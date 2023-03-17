import React from 'react';
import CustomButton from '../../../../components/CustomButton/CustomButton';

import style from './style.module.css';

export default function VoteGamePage() {
  return (
    <div className={style.voteGamePage__container}>
      <h2 className={style.voteGamePage__title}>Vote</h2>
      <h2 className={style.voteGamePage__subtitle}>VS</h2>
      <h3 className={style.voteGamePage__setup}>
        Ребенок не хочет есть мясо. Чем его можно заменить?
      </h3>
      <div className={style.voteGamePage__wrapper}>
        <div className={style.voteGamePage__box}>
          <h4 className={style.voteGamePage__setup}>Punch</h4>
          <CustomButton
            title="Vote"
          />
        </div>
        <div className={style.voteGamePage__box}>
          <h4 className={style.voteGamePage__setup}>Punch</h4>
          <CustomButton
            title="Vote"
          />
        </div>
      </div>
    </div>

  );
}
