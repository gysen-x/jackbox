import React from 'react';

import style from './ShowRoundPage.module.css';

export default function ShowRoundPage({ round }) {
  return (
    <div className={style.ShowRoundPage__container}>
      <h1 className={style.ShowRoundPage__title}>
        {round === 1 ? 'Everybody is ready' : 'Next round'}
      </h1>
      <h2>
        Round:
        {' '}
        {round}
      </h2>
    </div>
  );
}
