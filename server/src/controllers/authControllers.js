/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');

const { Op } = require('sequelize');
const { User } = require('../../db/models');

const { generateAccessToken, decodeToken } = require('./lib/jwt');

exports.signInAndSendStatus = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFromDatabase = await User.findOne({
      where: { email: { [Op.iLike]: email } },
      raw: true,
    });
    const isSamePassword = await bcrypt.compare(password, userFromDatabase.password);
    if (isSamePassword) {
      const { id, login: name } = userFromDatabase;
      const token = generateAccessToken(id);
      res.status(200).json({ token, user: { id, name } });
    } else {
      res.status(401).json({ errMsg: 'Wrong password or email!' });
    }
  } catch (err) {
    const errMsg = 'Wrong email or password!';
    res.status(401).json({ errMsg });
  }
};

exports.signUpAndSendStatus = async (req, res) => {
  const { login, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      login,
      email,
      password: hashPassword,
      avatar: 'https://img.freepik.com/fotos-premium/cabeza-hipster-espacio-vacio-ilustracion-render-3d_1172-983.jpg',
      ready: false,
    });

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

    const { id, login: name, status } = user;
    res.json({ token, user: { id, name, status } });
  } catch (error) {
    res.json({ fail: 'fail' });
  }
};
