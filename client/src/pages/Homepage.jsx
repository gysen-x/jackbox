import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton/CustomButton';
import './Homepage.css';
import MainPage from './MainPage/MainPage';

export default function Homepage() {
  const isAuth = useSelector((store) => store.user);
  const navigate = useNavigate();

  return (
    (isAuth
      ? <MainPage />
      : (
        <div className="contentWrapper">
          <img style={{ width: 357.5, height: 100 }} className="logoMini" src="/images/Logo.png" alt="logo" />
          <CustomButton
            title="Login"
            color="#fe9e84"
            type="button"
            handleOnClick={() => navigate('/signin')}
          />
          <img className="nyan" src="/images/nyan.gif" alt="logo" />
        </div>
      ))
  );
}
