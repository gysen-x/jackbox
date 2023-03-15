const express = require('express');

const router = express.Router();

const {
  getRooms, createRoom,
} = require('../controllers/roomControllers');

router.get('/', getRooms);

router.post('/', createRoom);

module.exports = router;
