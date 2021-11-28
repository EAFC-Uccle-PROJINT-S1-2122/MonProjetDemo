const debug = require("debug")("monprojetdemo:schema");
const connection = require('./connection');
const { DataTypes, Model } = require('sequelize');

debug("Defining EducationUnit model...");

class EducationUnit extends Model {}

EducationUnit.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { sequelize: connection, modelName: "educationUnit", tableName: "education_units" });

debug("EducationUnit model defined");

module.exports = EducationUnit;
