const express = require('express');

const router = express.Router();

const {
  getGames, createGame,
} = require('../controllers/gameControllers');

router.get('/', getGames);

router.post('/', createGame);

module.exports = router;
