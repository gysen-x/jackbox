import React from 'react';
import {Box, Grid} from "@mui/material";
import style from './css/style.module.css'
import Chat from "./Chat/Chat";

const GamePage = () => {
    return (
        <Grid className={style.gamePage} container spacing={2}>
            <Grid item xs>
                <Box>xs</Box>
            </Grid>
            <Grid item xs={4}>
                <Chat/>
            </Grid>
        </Grid>
    );
};

export default GamePage;