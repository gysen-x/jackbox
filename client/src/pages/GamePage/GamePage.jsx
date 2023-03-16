import React, {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import {Grid} from '@mui/material';
import style from './css/style.module.css';
import Chat from './Chat/Chat';
import StartGamePage from './GameField/StartGamePage/StartGamePage';
import GameFriendsPage from './GameField/GameFriendsPage/GameFriendsPage';
import CustomButton from "../../components/CustomButton/CustomButton";
import {useNavigate, useParams} from "react-router-dom";

const SERVER_URL = 'http://localhost:3000';

function GamePage() {
    const [user, setUser] = useState({})
    const socketRef = useRef(null);
    const id = useParams()
    const navigate = useNavigate()

    // useEffect(() => {
    //     socketRef.current = io(SERVER_URL);
    //     socketRef.current.emit('connection');
    //     socketRef.current.on('userStatus', (status) => {
    //         setUser({...user, status: status});
    //     });
    // }, []);


    //На выход из комнаты
    const handleClick = (event) => {
        socketRef.current = io(SERVER_URL);
        const token = localStorage.getItem('token');
        socketRef.current.emit('disconnectRoom', {id, token});
        navigate(`/rooms`);
    };


    return (
        <Grid className={style.gamePage} container spacing={2}>
            <Grid item xs>
                <StartGamePage/>
                <GameFriendsPage/>
            </Grid>
            <Grid item xs={4}>
                <Chat/>
            </Grid>
        </Grid>
    );
}

export default GamePage;
