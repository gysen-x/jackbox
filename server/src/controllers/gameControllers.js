/* eslint-disable consistent-return */
const { AllGames } = require('../../db/models');

exports.getGames = async (req, res) => {
  const games = await AllGames.findAll();
  res.json(games);
};
