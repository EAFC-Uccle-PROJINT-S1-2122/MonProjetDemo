const { Sequelize } = require('sequelize');
const debug = require('debug')('monprojetdemo:models');

const sequelize = new Sequelize('studentdb', 'root', '', {
    dialect: 'mysql',
    dialectOptions: {
        host: "localhost",
        port: 3306
    },
    logging: msg => debug(msg),
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = { sequelize };
