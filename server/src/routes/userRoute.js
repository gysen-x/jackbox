const express = require('express');

const router = express.Router();

const {
  getUser, deleteFriendhip, changeUserInfo, changeUserPassword, getMessages,
} = require('../controllers/userControllers');

router.get('/', getUser);

router.delete('/', deleteFriendhip);

router.put('/', changeUserInfo);

router.patch('/', changeUserPassword);

router.get('/:id/messages', getMessages);
module.exports = router;
