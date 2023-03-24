const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const fs = require('fs').promises;
const path = require('path');

const { User, Friendship, PrivateMessage } = require('../../db/models');

const { decodeToken } = require('./lib/jwt');

exports.getUser = async (req, res) => {
  const oldToken = req.headers.authentication.split(' ')[1];
  const decoded = decodeToken(oldToken);
  const { id } = decoded;

  try {
    const user = await User.findOne({ where: { id }, attributes: ['login', 'email', 'avatar'] });
    const friendsAll = await Friendship.findAll({
      where: { userId1: id },
      attributes: ['userId2'],
      include: { model: User },
    });
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
    await Friendship.destroy({
      where: {
        [Op.or]: [
          { userId1, userId2 },
          { userId1: userId2, userId2: userId1 },
        ],
      },
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
  }
};

exports.changeUserInfo = async (req, res) => {
  const oldToken = req.headers.authentication.split(' ')[1];
  const decoded = decodeToken(oldToken);
  const { id } = decoded;
  const { login, email } = req.body;

  if (req.file?.path) {
    const avatar = req.file.path;
    const url = 'http://funboxgame.ru/api/';
    console.log(url);
    console.log(url + avatar);

    try {
      const user = await User.findByPk(id);
      const { avatar: deletefile } = user;
      const deletepath = path.join(__dirname, '..', '..', deletefile.replace(url, ''));
      await User.update({ avatar: url + avatar }, { where: { id } });
      if (deletefile.slice(0, 5) === 'http:') {
        await fs.rm(deletepath);
      }
      res.json({ avatar: url + avatar });
    } catch (error) {
      res.sendStatus(401);
    }
  }

  if (login || email) {
    try {
      await User.update({ login, email }, { where: { id } });
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(401);
    }
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

exports.getMessages = async (req, res) => {
  const oldToken = req.headers.authentication.split(' ')[1];
  const decoded = decodeToken(oldToken);
  const { id: senderId } = decoded;
  const { id: recipientId } = req.params;

  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { id: senderId },
          { id: recipientId },
        ],
      },
    });

    const messages = await PrivateMessage.findAll({
      where: {
        [Op.or]: [
          { senderId, recipientId },
          { senderId: recipientId, recipientId: senderId },
        ],
      },
    });

    const allPrivateMessages = [];

    for (let i = 0; i < messages.length; i += 1) {
      const user = {};
      for (let j = 0; j < 2; j += 1) {
        if (users[j].id === messages[i].senderId) {
          user.login = users[j].login;
          user.id = users[j].id;
        }
      }
      allPrivateMessages.push({
        id: messages[i].id,
        text: messages[i].text,
        time: messages[i].createdAt,
        user,
      });
    }

    res.json(allPrivateMessages);
  } catch (error) {
    console.log(error);
    res.json({ fail: 'fail' });
  }
};
