/* eslint-disable consistent-return */
const {
  Room, AllGames, User, Message,
} = require('../../db/models');
const { decodeToken } = require('./lib/jwt');

exports.getRooms = async (req, res) => {
  const rooms = await Room.findAll({ include: { model: AllGames }, raw: true, nest: true });
  const roomsWithGames = rooms.map((el) => (el.password ? (
    {
      id: el.id,
      name: el.name,
      isPassword: true,
      members: el.members,
      gameName: el.AllGame.name,
      maxPlayers: el.maxPlayers,
    }) : {
    id: el.id,
    name: el.name,
    isPassword: false,
    members: el.members,
    gameName: el.AllGame.name,
    maxPlayers: el.maxPlayers,
  }));
  res.json(roomsWithGames);
};

exports.createRoom = async (req, res) => {
  const {
    name, gameId, password, token, maxPlayers,
  } = req.body;
  const { id: userId } = decodeToken(token);
  try {
    let newRoom;
    if (!password) {
      newRoom = await Room.create({
        name, gameId, members: 1, maxPlayers,
      });
    } else {
      newRoom = await Room.create({
        name, gameId, password, members: 1, maxPlayers,
      });
    }

    const { id } = newRoom;
    await User.update({ status: 'admin', roomId: id }, { where: { id: userId } });
    res.json({ id });
  } catch (error) {
    console.log(error);
    res.json({ fail: 'fail' });
  }
};

exports.checkPass = async (req, res) => {
  const { id, password } = req.body;
  try {
    const room = await Room.findByPk(id);
    if (room.password === password) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};

exports.getRoomsMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const messagesAndUsers = await Message.findAll({
      where: { roomId: id },
      include: { model: User },
    });
    const allMessages = messagesAndUsers.map((message) => ({
      id: message.id,
      text: message.text,
      time: message.createdAt,
      user: {
        login: message.User.login,
        id: message.User.id,
      },
    }));
    res.json(allMessages);
  } catch (error) {
    res.sendStatus(401);
  }
};

exports.getParticipants = async (req, res) => {
  const { id } = req.params;
  try {
    const participants = await User.findAll({ where: { roomId: id }, attributes: ['id', 'login', 'avatar', 'ready'] });
    res.json(participants);
  } catch (error) {
    res.sendStatus(401);
  }
};

exports.checkUserInRoom = async (req, res) => {
  const token = req.headers.authentication.split(' ')[1];
  const { id } = decodeToken(token);
  const { id: roomId } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user.roomId === Number(roomId)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};
