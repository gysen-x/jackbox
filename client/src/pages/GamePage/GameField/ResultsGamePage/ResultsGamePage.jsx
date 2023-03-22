import { Avatar } from '@mui/material';
import React from 'react';
import style from './style.module.css';

export default function ResultsGamePage({ results }) {
  return (
    <div className={style.resultsGamePage__container}>
      <h1 className={style.resultsGamePage__title}>Results</h1>
      <div className={style.resultsGamePage__bestPunch}>
        <h2 className={style.resultsGamePage__bestPunchTitle}>Best punch</h2>
        <div className={style.resultsGamePage__resultsGamePage__bestPunchBox}>
          <p className={style.resultsGamePage__resultsGamePage__bestPunchPunch}>
            {results.finalBestPunch.user}

          </p>
          <p
            className={style.resultsGamePage__resultsGamePage__bestPunchSetup}
          >
            {results.finalBestPunch.setup}

          </p>
          <p
            className={style.resultsGamePage__resultsGamePage__bestPunchPunch}
          >
            {results.finalBestPunch.punch}

          </p>
          <p
            className={style.resultsGamePage__resultsGamePage__bestPunchPoints}
          >
            {results.finalBestPunch.votes}

          </p>
        </div>
      </div>
      <div className={style.resultsGamePage__rating}>
        <div className={style.resultsGamePage__ratingSecond}>
          <p>2</p>
          <p className={style.resultsGamePage__second}>{results.topThreeResults[1].login}</p>
          <Avatar
            src={results.topThreeResults[1].avatar}
          />
        </div>
        <div className={style.resultsGamePage__ratingFirst}>
          <p>1</p>
          <p className={style.resultsGamePage__second}>{results.topThreeResults[0].login}</p>
          <Avatar
            src={results.topThreeResults[0].avatar}
          />
        </div>
        {/* <div className={style.resultsGamePage__ratingThird}>
          <p>3</p>
          <p className={style.resultsGamePage__second}>{results.topThreeResults[2].login}</p>
          <Avatar
            src={results.topThreeResults[2].avatar}
          />
        </div> */}
      </div>
    </div>
  );
}
