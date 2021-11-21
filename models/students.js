const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./db_connection');

class Student extends Model { }
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

module.exports = { Student };
