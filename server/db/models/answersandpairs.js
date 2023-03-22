const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AnswersAndPairs extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'playerId1' });
      this.belongsTo(models.User, { foreignKey: 'playerId2' });
      this.belongsTo(models.Room, { foreignKey: 'roomId' });
    }
  }

  AnswersAndPairs.init({
    roomId: DataTypes.INTEGER,
    playerId1: DataTypes.INTEGER,
    playerId2: DataTypes.INTEGER,
    setup: DataTypes.STRING,
    punchPlayer1: DataTypes.STRING,
    votesFor1: DataTypes.INTEGER,
    punchPlayer2: DataTypes.STRING,
    votesFor2: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'AnswersAndPairs',
  });
  return AnswersAndPairs;
};
