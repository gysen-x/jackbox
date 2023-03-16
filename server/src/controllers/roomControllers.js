/* eslint-disable consistent-return */
const { Room, AllGames } = require('../../db/models');

exports.getRooms = async (req, res) => {
  const rooms = await Room.findAll({ include: { model: AllGames }, raw: true, nest: true });
  const roomsWithGames = rooms.map((el) => (el.password ? (
    {
      id: el.id,
      name: el.name,
      isPassword: true,
      members: el.members,
      gameName: el.AllGame.name,
      maxPlayers: el.AllGame.maxPlayers,
    }) : {
    id: el.id,
    name: el.name,
    isPassword: false,
    members: el.members,
    gameName: el.AllGame.name,
    maxPlayers: el.AllGame.maxPlayers,
  }));
  res.json(roomsWithGames);
};

exports.createRoom = async (req, res) => {
  const { name, gameId, password } = req.body;
  try {
    let newRoom;
    if (!password) {
      newRoom = await Room.create({ name, gameId, members: 1 });
    } else {
      newRoom = await Room.create({
        name, gameId, password, members: 1,
      });
    }
    const { id } = newRoom;
    res.json({ id });
  } catch (error) {
    res.json({ fail: 'fail' });
  }
};

exports.checkPass = async (req, res) => {
  const { id, password } = req.body;
  try {
    const room = Room.findByPk(id);
    if (room.password === password) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};
