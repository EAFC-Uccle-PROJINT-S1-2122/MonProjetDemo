const { Sequelize, DataTypes, Model } = require('sequelize');

const db_hostname = process.env.DB_HOSTNAME || 'localhost';
const db_dbname = process.env.DB_DBNAME || 'studentdb';
const db_username = process.env.DB_USERNAME || 'root';
const db_password = process.env.DB_PASSWORD || '';
const db_dialect = process.env.DB_DIALECT || 'mysql';

const sequelize = new Sequelize(db_dbname, db_username, db_password, {
    host: db_hostname,
    dialect: db_dialect
});

class Student extends Model {}

Student.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: "student" });

module.exports = { sequelize, Student };
