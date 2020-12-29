'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Message, {
        through: models.Commentaire,
        foreignKey: 'userId',
        otherKey: 'messageId',
      });
  
      models.Message.belongsToMany(models.User, {
        through: models.Commentaire,
        foreignKey: 'messageId',
        otherKey: 'userId',
      });
  
      models.Commentaire.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
  
      models.Commentaire.belongsTo(models.Message, {
        foreignKey: 'messageId',
        as: 'message',
      });
    }
  };
  Commentaire.init({
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commentaire',
  });
  return Commentaire;
};