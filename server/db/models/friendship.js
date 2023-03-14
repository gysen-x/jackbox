'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FriendShip extends Model {
    static associate(models) {
    }
  }
  FriendShip.init({
    userId1: DataTypes.INTEGER,
    userId2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FriendShip',
  });
  return FriendShip;
};