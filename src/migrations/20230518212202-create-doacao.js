'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Doacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      idStatusDoacao: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StatusDoacaos',
          key: 'id',
          allowNull: true
        }
      },
      idHorario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Horarios',
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
    await queryInterface.dropTable('Doacaos');
  }
};