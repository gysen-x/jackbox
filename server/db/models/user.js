'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.User, {as: 'user1', through: models.Friendship, foreignKey: 'userId1'})
            this.belongsToMany(models.User, {as: 'user2', through: models.Friendship, foreignKey: 'userId2'})
            this.hasOne(models.GameSession, {foreignKey: 'userId'})
            this.hasMany(models.Message, {foreignKey: 'userId'})
        }
    }

    User.init({
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        status: DataTypes.STRING,
        roomId: DataTypes.INTEGER,
        pointsInGame: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};