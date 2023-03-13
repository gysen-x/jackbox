const express = require('express');

const router = express.Router();

const {
  signInAndSendStatus, signUpAndSendStatus, signout, check,
} = require('../controllers/authControllers');

router.post('/signin', signInAndSendStatus);

router.post('/signup', signUpAndSendStatus);

router.get('/signout', signout);

router.get('/check', check);

module.exports = router;
