const { DataTypes, Model } = require('sequelize');
const connection = require('./connection');

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
}, { sequelize: connection, modelName: "student" });

module.exports = Student;
