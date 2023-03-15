const express = require('express');

const router = express.Router();

const {
  getUser, deleteFriendhip,
} = require('../controllers/userControllers');

router.get('/', getUser);

router.delete('/', deleteFriendhip);

module.exports = router;
