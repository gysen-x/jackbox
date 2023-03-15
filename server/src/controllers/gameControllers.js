/* eslint-disable consistent-return */
const { AllGames, Room } = require('../../db/models');

exports.getGames = async (req, res) => {
  const games = await AllGames.findAll();
  res.json(games);
};

exports.createGame = async (req, res) => {
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
