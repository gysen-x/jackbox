'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllGames extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AllGames.init({
    gameId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    shortRules: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AllGame',
  });
  return AllGames;
};