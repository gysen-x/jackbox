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
      const { id, name } = userFromDatabase;
      const token = generateAccessToken(id);
      console.log(id, name, token);
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
  const { name: uName, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name: uName, email, password: hashPassword });

    const { id, name } = user;
    const token = generateAccessToken(id);
    res.json({ token, user: { id, name } });
  } catch (err) {
    let errMsg = err.message;
    if (err.name === 'SequelizeUniqueConstraintError') errMsg = err.errors[0].message;
    res.status(401).json({ errMsg });
  }
};

exports.check = async (req, res) => {
  const oldToken = req.headers.authorization.split(' ')[1];
  if (!oldToken) {
    res.json({ fail: 'fail' });
  } else {
    const decoded = decodeToken(oldToken);
    const { id: userId } = decoded;

    const token = generateAccessToken(userId);

    const user = await User.findByPk(userId);

    const { id, name } = user;
    res.json({ token, user: { id, name } });
  }
};
