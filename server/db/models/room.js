'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.AllGames, {foreignKey: 'gameId'})
            this.hasOne(models.GameSession, {foreignKey: 'roomId'}, {onDelete: 'cascade'}, {hooks: true})
            this.hasMany(models.Message, {foreignKey: 'roomId'}, {onDelete: 'cascade'}, {hooks: true})

        }
    }

    Room.init({
        gameId: DataTypes.INTEGER,
        password: DataTypes.STRING,
        members: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Room',
    });
    return Room;
};