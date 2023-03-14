'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Friendship extends Model {
        static associate(models) {

        }
    }

    Friendship.init({
        userId1: DataTypes.INTEGER,
        userId2: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Friendship',
    });
    return Friendship;
};