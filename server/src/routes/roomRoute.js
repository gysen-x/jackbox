const express = require('express');

const router = express.Router();

const {
  getRooms, createRoom, checkPass,
} = require('../controllers/roomControllers');

router.get('/', getRooms);

router.post('/', createRoom);

router.post('/checkPass', checkPass);

module.exports = router;
