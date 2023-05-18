'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusDoacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StatusDoacao.init({
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StatusDoacao',
  });
  return StatusDoacao;
};