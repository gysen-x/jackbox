import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

export default function Homepage() {
  const isAuth = useSelector((store) => store.user);
  const navigate = useNavigate();

  return (
    <div className="homepageWrapper">
      <h1 className="homepageH1">GAME BOX</h1>
      {isAuth
        ? (
          <button onClick={() => navigate('/choose')} className="buttonAction" type="button">
            <span className="button_top button_play">
              Play
            </span>
          </button>
        ) : (
          <button onClick={() => navigate('/signin')} className="buttonAction" type="button">
            <span className="button_top button_login">
              Login
            </span>
          </button>
        )}
      <img className="logoMini" src="/images/b536a8d6.svg" alt="logo" />
    </div>
  );
}
