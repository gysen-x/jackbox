const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Setup extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      this.belongsTo(models.AllGames, { foreignKey: 'gameId' });
    }
  }

  Setup.init({
    body: DataTypes.STRING,
    gameId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Setup',
  });
  return Setup;
};
