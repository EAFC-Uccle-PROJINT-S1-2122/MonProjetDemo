const debug = require("debug")("monprojetdemo:schema");

const connection = require('./connection');
const { DataTypes, Model } = require('sequelize');

debug("Defining Class model...");

class Class extends Model {}

Class.init({
    academicYear: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shortName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { sequelize: connection, modelName: "class" });

debug("Class model defined.");

module.exports = Class;
