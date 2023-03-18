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
    }
  }

  AnswersAndPairs.init({
    playerId1: DataTypes.INTEGER,
    playerId2: DataTypes.INTEGER,
    setup: DataTypes.STRING,
    punchPlayer1: DataTypes.STRING,
    punchPlayer2: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AnswersAndPairs',
  });
  return AnswersAndPairs;
};
