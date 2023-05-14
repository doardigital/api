const { Sequelize } = require('sequelize');
const db = require('./db');

const sequelize = new Sequelize(
  db.database, 
  db.username,
  db.password, {
      host: db.host,
      dialect: db.dialect,
  }
);

module.exports = sequelize;
