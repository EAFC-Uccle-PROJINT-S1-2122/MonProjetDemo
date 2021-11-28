const { DataTypes, Model } = require('sequelize');
const connection = require('./connection');

class EducationUnit extends Model {}

EducationUnit.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { sequelize: connection, modelName: "educationUnit" });

module.exports = EducationUnit;
