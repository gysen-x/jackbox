const express = require('express');

const router = express.Router();

const {
  getUser,
} = require('../controllers/userControllers');

router.post('/', getUser);

module.exports = router;
