import { Avatar } from '@mui/material';
import React from 'react';
import style from './style.module.css';

export default function ResultsGamePage() {
  return (
    <div className={style.resultsGamePage__container}>
      <h1 className={style.resultsGamePage__title}>Results</h1>
      <div className={style.resultsGamePage__bestPunch}>
        <h2 className={style.resultsGamePage__bestPunchTitle}>Best punch</h2>
        <div className={style.resultsGamePage__resultsGamePage__bestPunchBox}>
          <p className={style.resultsGamePage__resultsGamePage__bestPunchSetup}>Setup</p>
          <p className={style.resultsGamePage__resultsGamePage__bestPunchPunch}>Punch</p>
          <p className={style.resultsGamePage__resultsGamePage__bestPunchPoints}>Points</p>
        </div>
      </div>
      <div className={style.resultsGamePage__rating}>
        <div className={style.resultsGamePage__ratingSecond}>
          <p className={style.resultsGamePage__ratingSecond}>2</p>
          <Avatar />
        </div>
        <div className={style.resultsGamePage__ratingFirst}>
          <p className={style.resultsGamePage__second}>1</p>
          <Avatar />
        </div>
      </div>
    </div>
  );
}
