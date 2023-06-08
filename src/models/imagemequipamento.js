'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImagemEquipamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ImagemEquipamento.init({
    base64: DataTypes.TEXT,
    tipo: DataTypes.STRING,
    idEquipamento: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ImagemEquipamento',
  });
  return ImagemEquipamento;
};