const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BestPunch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Room, { foreignKey: 'roomId' });
    }
  }
  BestPunch.init(
    {
      punch: DataTypes.TEXT,
      setup: DataTypes.TEXT,
      roomId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      votes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'BestPunch',
    },
  );
  return BestPunch;
};
