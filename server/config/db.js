const { Sequelize } = require('sequelize');
require('dotenv').config();

// console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;
