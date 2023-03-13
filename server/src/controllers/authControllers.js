const bcrypt = require('bcrypt');

const { User } = require('../../db/models');

exports.signInAndSendStatus = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFromDatabase = await User.findOne({ where: { email }, raw: true });
    const isSamePassword = await bcrypt.compare(password, userFromDatabase.password);
    if (!userFromDatabase) {
      return res.status(401).json({ errMsg: 'Wrong email or password!' });
    }
    if (isSamePassword) {
      req.session.user = { id: userFromDatabase.id, name: userFromDatabase.name };
      req.session.save();
      res.status(200).json(req.session.user);
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
  const { name, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });

    req.session.user = { id: user.id, name: user.name };
    req.session.save();
    res.json(req.session.user);
  } catch (err) {
    let errMsg = err.message;
    if (err.name === 'SequelizeUniqueConstraintError') errMsg = err.errors[0].message;
    res.status(401).json({ errMsg });
  }
};

exports.signout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.clearCookie('cookie');
    res.sendStatus(200);
  });
};

exports.check = (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.json({ fail: 'fail' });
  }
};
