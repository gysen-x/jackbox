require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.generateAccessToken = (id) => {
  console.log(process.env.SECRET_JWT);
  const payload = { id };
  return jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '24h' });
};

exports.decodeToken = (token) => jwt.verify(token, process.env.SECRET_JWT);
