import { Avatar } from '@mui/material';
import React from 'react';
import style from './style.module.css';

export default function ResultsGamePage({ results }) {
  console.log('results: ', results);
  return (
    <div className={style.resultsGamePage__container}>
      <h1 className={style.resultsGamePage__title}>Results</h1>
      <div className={style.resultsGamePage__bestPunch}>
        <div className={style.resultsGamePage__resultsGamePage__bestPunchBox}>

          <div className={style.resultsGamePage__resultsGamePage__left}>
            <h2 className={style.resultsGamePage__bestPunchTitle}>Best punch</h2>
            <div className={style.resultsGamePage__resultsGamePage__bestPunchUser}>

              Author :
              <p className={style.resultsGamePage__resultsGamePage__bestPunchUser}>
                {results.finalBestPunch.user}
              </p>

            </div>
            <p
              className={style.resultsGamePage__resultsGamePage__bestPunchPoints}
            >
              Votes :
              {results.finalBestPunch.votes}
            </p>
          </div>

          <div className={style.resultsGamePage__resultsGamePage__right}>
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
          </div>
        </div>
      </div>
      <div className={style.resultsGamePage__rating}>
        <div className={style.resultsGamePage__ratingSecond}>
          <img
            className={style.resultsGamePage__ratingFirstImage}
            src="/images/second.png"
            alt="second"
          />
          <div>
            <Avatar
              src={results.topThreeResults[1].avatar}
            />
            <p className={style.resultsGamePage__second}>{results.topThreeResults[1].login}</p>
          </div>
          <p>{results.topThreeResults[1].pointsInGame}</p>
        </div>
        <div className={style.resultsGamePage__ratingFirst}>
          <img
            className={style.resultsGamePage__ratingFirstImage}
            src="/images/first.png"
            alt="first"
          />
          <div>
            <Avatar
              src={results.topThreeResults[0].avatar}
            />
            <p className={style.resultsGamePage__second}>{results.topThreeResults[0].login}</p>
          </div>
          <p>{results.topThreeResults[0].pointsInGame}</p>
        </div>
        <div className={style.resultsGamePage__ratingThird}>

          <img
            className={style.resultsGamePage__ratingFirstImage}
            src="/images/third.png"
            alt="third"
          />
          <div>
            <Avatar
              src={results.topThreeResults[2].avatar}
            />
            <p className={style.resultsGamePage__second}>{results.topThreeResults[2].login}</p>
          </div>
          <p>{results.topThreeResults[2].pointsInGame}</p>
        </div>
      </div>
    </div>
  );
}
