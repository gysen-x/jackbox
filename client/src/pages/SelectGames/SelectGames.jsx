/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import './SelectGames.css';

// для карточки id инпута и htmlFor лейбла должны совпадать, но быть уникальными для каждой карточки

export default function SelectGames() {
  const navigate = useNavigate();
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const response = fetch('/games');
    response
      .then((res) => res.json())
      .then((data) => {
        console.log(data); setAllGames(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="contentWrapper">
      <h1 className="homepageH1">SELECT GAME</h1>
      <p>Tap to card</p>
      <div className="gamesWrapper">
        {allGames.join()
          ? allGames.map(({
            name, rules, description, img, maxPlayers, id,
          }) => (
            <div key={`div${id}`} className="gameWrapper">
              <input id="radioCheck" type="checkbox" className="checkCard" />
              <label htmlFor="radioCheck" className="flipCard">
                <div className="card">
                  <img className="img-card" src={img} alt="game card" />
                  <div className="info-card">
                    <p>{name}</p>
                    <p>{description}</p>
                  </div>
                </div>
                <div className="card_back">
                  <p>Правила игры:</p>
                  <p>{rules}</p>
                  <p>
                    Max players:
                    {' '}
                    {maxPlayers}
                  </p>
                </div>
              </label>
              <CustomButton
                title="Play"
                color="#fe9e84"
                type="button"
                handleOnClick={() => navigate(`/games/${id}/options`)}
              />
            </div>
          ))
          : <div>Games not found</div>}
      </div>
      <CustomButton
        title="Back"
        color="#fe9e84"
        type="button"
        handleOnClick={() => navigate('/choose')}
      />
      <img className="logoMini" src="/images/Logo.png" alt="logo" />
    </div>
  );
}
