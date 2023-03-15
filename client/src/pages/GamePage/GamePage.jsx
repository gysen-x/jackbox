import React from 'react';
import {Box, Grid} from "@mui/material";
import style from './css/style.module.css'
import Chat from "./Chat/Chat";
import StartGamePage from "./GameField/StartGamePage/StartGamePage";

const GamePage = () => {
    return (
        <Grid className={style.gamePage} container spacing={2}>
            <Grid item xs>
                <StartGamePage/>
            </Grid>
            <Grid item xs={4}>
                <Chat/>
            </Grid>
        </Grid>
    );
};

export default GamePage;