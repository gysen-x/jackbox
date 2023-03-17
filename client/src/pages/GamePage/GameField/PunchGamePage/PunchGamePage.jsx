import React, { useEffect, useState } from 'react';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { Timer } from '../StartGamePage/Timer/Timer';

import style from './style.module.css';

export default function PunchGamePage() {
  const [setup, setSetup] = useState('');

  useEffect(() => {
    setSetup('Ребенок не хочет есть мясо. Чем его можно заменить?');
  }, []);

  return (
    <div className={style.PunchGamePage}>
      <div className={style.PunchGamePage__container}>
        <h1 className={style.PunchGamePage__title}>Punch</h1>
        <p className={style.PunchGamePage__setup}>{setup}</p>
        <form className={style.PunchGamePage__form}>
          <CustomInput
            placeholder="Enter your punch..."
          />
          <CustomButton
            title="Send"
            color="#fe9e84"
          />
        </form>
      </div>
      <Timer className={style.PunchGamePage__timer} />
    </div>
  );
}
