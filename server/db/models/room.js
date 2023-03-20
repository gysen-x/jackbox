const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      this.hasMany(models.User, { foreignKey: 'roomId' });
      this.hasMany(models.AnswersAndPairs, { foreignKey: 'roomId' }, { onDelete: 'cascade' }, { hooks: true });
      this.belongsTo(models.AllGames, { foreignKey: 'gameId' });
      this.hasMany(models.Message, { foreignKey: 'roomId' }, { onDelete: 'cascade' }, { hooks: true });
    }
  }

  Room.init({
    name: DataTypes.STRING,
    gameId: DataTypes.INTEGER,
    password: DataTypes.STRING,
    members: DataTypes.INTEGER,
    votes: DataTypes.INTEGER,
    round: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
