const express = require('express');

const router = express.Router();

const {
    getRooms, createRoom, checkPass, getRoomsMessages
} = require('../controllers/roomControllers');

router.get('/', getRooms);

router.post('/', createRoom);

router.post('/checkPass', checkPass);

router.get('/:id/messages', getRoomsMessages);

module.exports = router;
