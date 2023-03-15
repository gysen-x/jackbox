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
