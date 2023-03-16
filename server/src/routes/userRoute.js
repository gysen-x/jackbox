const express = require('express');

const router = express.Router();

const {
  getUser, deleteFriendhip, changeUserInfo, changeUserPassword,
} = require('../controllers/userControllers');

router.get('/', getUser);

router.delete('/', deleteFriendhip);

router.put('/', changeUserInfo);

router.patch('/', changeUserPassword);
module.exports = router;
