const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AllGames extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      this.hasMany(models.Room, { foreignKey: 'gameId' }, { onDelete: 'cascade' }, { hooks: true });
      this.hasMany(models.Setup, { foreignKey: 'gameId' }, { onDelete: 'cascade' }, { hooks: true });
    }
  }

  AllGames.init({
    name: DataTypes.STRING,
    rules: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AllGames',
  });
  return AllGames;
};
