/* eslint-disable consistent-return */
const { Room } = require('../../db/models');

exports.getRooms = async (req, res) => {
  const rooms = await Room.findAll({ include: 'AllGames' });
  const roomsWithGames = rooms.map((el) => (
    {
      id: el.id,
      members: el.members,
      gameName: el.AllGames.name,
      maxPlayers: el.AllGames.maxPlayers,
    }));
  res.json(roomsWithGames);
};

exports.createRoom = async (req, res) => {
  const { name, gameId, password } = req.body;
  try {
    let newRoom;
    if (!password) {
      newRoom = await Room.create({ name, gameId });
    } else {
      newRoom = await Room.create({ name, gameId, password });
    }
    const { id } = newRoom;
    res.json({ id });
  } catch (error) {
    res.json({ fail: 'fail' });
  }
};
