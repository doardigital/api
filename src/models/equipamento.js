'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Equipamento.init({
    nome: DataTypes.STRING,
    modelo: DataTypes.STRING,
    marca: DataTypes.STRING,
    tempoUso: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    estadoEquipamento: DataTypes.CHAR(1),
    statusDoacao: DataTypes.CHAR(1),
    dataEntrega: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Equipamento',
  });
  return Equipamento;
};