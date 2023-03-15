require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '24h' });
};

exports.decodeToken = (token) => jwt.verify(token, process.env.SECRET_JWT);
