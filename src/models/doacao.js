'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doacao.init({
    idUsuario: DataTypes.INTEGER,
    idStatusDoacao: DataTypes.INTEGER,
    idHorario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doacao',
  });
  return Doacao;
};