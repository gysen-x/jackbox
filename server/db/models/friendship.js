const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId1' }, { onDelete: 'cascade' }, { hooks: true });
      this.belongsTo(models.User, { foreignKey: 'userId2' }, { onDelete: 'cascade' }, { hooks: true });
    }
  }

  Friendship.init({
    userId1: DataTypes.INTEGER,
    userId2: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Friendship',
  });
  return Friendship;
};
