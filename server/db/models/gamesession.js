'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GameSession extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Room, {foreignKey: 'roomId'})
            this.hasMany(models.User, {foreignKey: 'userId'})
        }
    }

    GameSession.init({
        userId: DataTypes.INTEGER,
        roomId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'GameSession',
    });
    return GameSession;
};