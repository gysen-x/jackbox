const express = require('express');
const multer = require('multer');
const { storage } = require('../middles/middles');

const router = express.Router();

const upload = multer({ storage });

const {
  getUser, deleteFriendhip, changeUserInfo, changeUserPassword, getMessages,
} = require('../controllers/userControllers');

router.get('/', getUser);

router.delete('/', deleteFriendhip);

router.put('/', upload.single('avatar'), changeUserInfo);

router.patch('/', changeUserPassword);

router.get('/:id/messages', getMessages);
module.exports = router;
