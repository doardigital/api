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
      idUsuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      estadoEquipamento: {
        allowNull: true,
        type: Sequelize.CHAR(1)
      },
      statusDoacao: {
        allowNull: true,
        type: Sequelize.CHAR(1),
        defaultValue: 'P'
      },
      dataEntrega: {
        allowNull: true,
        type: Sequelize.DATE
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