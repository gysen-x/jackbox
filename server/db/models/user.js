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
      this.hasOne(models.GameSession, { foreignKey: 'userId' }, { onDelete: 'cascade' }, { hooks: true });
      this.hasMany(models.Message, { foreignKey: 'userId' }, { onDelete: 'cascade' }, { hooks: true });
    }
  }

  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    pointsInGame: DataTypes.INTEGER,
    avatar: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
