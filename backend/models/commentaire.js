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
        foreignKey: 'usersId',
        otherKey: 'messageId',
      });

      models.Message.belongsToMany(models.User, {
        through: models.Commentaire,
        foreignKey: 'messageId',
        otherKey: 'usersId',
      });

      models.Commentaire.belongsTo(models.User, {
        foreignKey: 'usersId',
        as: 'user',
      });

      models.Commentaire.belongsTo(models.Message, {
        foreignKey: 'messageId',
        as: 'message',
      });
    }
  };
  Commentaire.init({
    usersId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commentaire',
  });
  return Commentaire;
};