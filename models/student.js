const debug = require("debug")("monprojetdemo:schema");
const connection = require('./connection');
const { DataTypes, Model } = require('sequelize');

debug("Defining Student model...");

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

debug("Student model defined.");

module.exports = Student;
