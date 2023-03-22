const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      this.hasMany(models.Friendship, { foreignKey: 'userId1' });
      this.hasMany(models.Friendship, { foreignKey: 'userId2' });
      this.hasMany(models.PrivateMessage, { foreignKey: 'senderId' });
      this.hasMany(models.PrivateMessage, { foreignKey: 'recipientId' });
      this.belongsTo(models.Room, { foreignKey: 'roomId' });
      this.hasMany(models.Message, { foreignKey: 'userId' }, { onDelete: 'cascade' }, { hooks: true });
      this.hasOne(models.AnswersAndPairs, { foreignKey: 'playerId1' });
      this.hasOne(models.AnswersAndPairs, { foreignKey: 'playerId2' });
      this.hasOne(models.BestPunch, { foreignKey: 'userId' });
    }
  }

  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    pointsInGame: DataTypes.INTEGER,
    votes: DataTypes.INTEGER,
    avatar: DataTypes.TEXT,
    ready: DataTypes.BOOLEAN,
    roomId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
