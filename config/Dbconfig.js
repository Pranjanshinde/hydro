const { Sequelize, ConnectionTimedOutError } = require('sequelize');
require("dotenv").config();


const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'mysql-2454a36c-pranjanshinde10-473a.i.aivencloud.com',
    dialect: "mysql",
    port :16950,
    dialectOptions:{
        connectTimeout: 86400
    }
  });

   async function coonection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }

  module.exports={coonection,sequelize}