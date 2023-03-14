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
            this.hasMany(models.Room, {foreignKey: 'gameId'})
            this.hasMany(models.Setup, {foreignKey: 'gameId'})
        }
    }

    AllGames.init({
        name: DataTypes.STRING,
        rules: DataTypes.STRING,
        description: DataTypes.STRING,
        maxPlayers: DataTypes.INTEGER,
        img: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'AllGames',
    });
    return AllGames;
};