import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton/CustomButton';
import './Homepage.css';

export default function Homepage() {
  const isAuth = useSelector((store) => store.user);
  const navigate = useNavigate();

  return (
    <div className="contentWrapper">
      <h1 className="homepageH1">GAME BOX</h1>
      {isAuth
        ? (
          <CustomButton
            title="Play"
            color="#fe9e84"
            type="button"
            handleOnClick={() => navigate('/choose')}
          />
        ) : (
          <CustomButton
            title="Login"
            color="#fe9e84"
            type="button"
            handleOnClick={() => navigate('/signin')}
          />
        )}
      <img className="logoMini" src="/images/Logo.png" alt="logo" />
    </div>
  );
}
