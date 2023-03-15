/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');

const { generateAccessToken, decodeToken } = require('./lib/jwt');

exports.signInAndSendStatus = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFromDatabase = await User.findOne({ where: { email }, raw: true });
    const isSamePassword = await bcrypt.compare(password, userFromDatabase.password);
    if (!userFromDatabase) {
      return res.status(401).json({ errMsg: 'Wrong email or password!' });
    }
    if (isSamePassword) {
      const { id, login: name } = userFromDatabase;
      const token = generateAccessToken(id);
      res.status(200).json({ token, user: { id, name } });
    } else {
      res.status(401).json({ errMsg: 'Wrong password or email!' });
    }
  } catch (err) {
    let errMsg = err.message;
    if (err.name === 'SequelizeUniqueConstraintError') errMsg = err.errors[0].message;
    res.status(401).json({ errMsg });
  }
};

exports.signUpAndSendStatus = async (req, res) => {
  const { login, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ login, email, password: hashPassword });

    const { id, login: name } = user;
    const token = generateAccessToken(id);
    res.json({ token, user: { id, name } });
  } catch (err) {
    let errMsg = err.message;
    if (err.name === 'SequelizeUniqueConstraintError') errMsg = err.errors[0].message;
    res.status(401).json({ errMsg });
  }
};

exports.check = async (req, res) => {
  try {
    const oldToken = req.headers.authentication.split(' ')[1];

    const decoded = decodeToken(oldToken);
    const { id: userId } = decoded;

    const token = generateAccessToken(userId);

    const user = await User.findByPk(userId);

    const { id, login: name } = user;
    res.json({ token, user: { id, name } });
  } catch (error) {
    res.json({ fail: 'fail' });
  }
};
