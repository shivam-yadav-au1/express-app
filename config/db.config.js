const Sequelize = require('sequelize');
const sequelize = new Sequelize('ecom', 'test','Test@123', {
  host: 'localhost',
  dialect: 'mysql',
 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.customers = require('../models/Customer.js')(sequelize, Sequelize);

 
module.exports = db;