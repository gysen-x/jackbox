const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PrivateMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'senderId' });
      this.belongsTo(models.User, { foreignKey: 'recipientId' });
    }
  }
  PrivateMessage.init({
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    text: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'PrivateMessage',
  });
  return PrivateMessage;
};
