'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Equipamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      modelo: {
        type: Sequelize.STRING
      },
      marca: {
        type: Sequelize.STRING
      },
      tempoUso: {
        type: Sequelize.INTEGER
      },
      idDoacao: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Doacaos',
          key: 'id'
        }
      },
      idEstadoEquipamento: {
        type: Sequelize.INTEGER,
        references: {
          model: 'EstadoEquipamentos',
          key: 'id',
          allowNull: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Equipamentos');
  }
};