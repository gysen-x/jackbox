const bcrypt = require('bcrypt');

const { User, Friendship } = require('../../db/models');

const { decodeToken } = require('./lib/jwt');

exports.getUser = async (req, res) => {
  const oldToken = req.headers.authentication.split(' ')[1];
  const decoded = decodeToken(oldToken);
  const { id } = decoded;

  try {
    const user = await User.findOne({ where: { id }, attributes: ['login', 'email', 'avatar'] });
    const friendsAll = await Friendship.findAll({ where: { userId1: id }, attributes: ['userId2'], include: { model: User } });
    const friends = friendsAll.map((el) => (
      {
        id: el.User.id,
        login: el.User.login,
        avatar: el.User.avatar,
      }));

    res.json({ user, friends });
  } catch (error) {
    res.json({ fail: 'fail' });
  }
};

exports.deleteFriendhip = async (req, res) => {
  const oldToken = req.headers.authentication.split(' ')[1];
  const decoded = decodeToken(oldToken);
  const { id: userId1 } = decoded;
  const { id: userId2 } = req.body;

  try {
    await Friendship.destroy({ where: { userId1, userId2 } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
  }
};

exports.changeUserInfo = async (req, res) => {
  const oldToken = req.headers.authentication.split(' ')[1];
  const decoded = decodeToken(oldToken);
  const { id } = decoded;
  const { login, email, avatar } = req.body;

  try {
    await User.update({ login, email, avatar }, { where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
  }
};

exports.changeUserPassword = async (req, res) => {
  const oldToken = req.headers.authentication.split(' ')[1];
  const decoded = decodeToken(oldToken);
  const { id } = decoded;
  const { oldPass, newPass } = req.body;

  try {
    const user = await User.findByPk(id);
    const isSamePassword = await bcrypt.compare(oldPass, user.password);

    if (isSamePassword) {
      const password = await bcrypt.hash(newPass, 10);
      await User.update({ password }, { where: { id } });
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};
