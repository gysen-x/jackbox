const express = require('express');

const router = express.Router();

const {
  signInAndSendStatus, signUpAndSendStatus, check,
} = require('../controllers/authControllers');

router.post('/signin', signInAndSendStatus);

router.post('/signup', signUpAndSendStatus);

router.get('/check', check);

module.exports = router;
