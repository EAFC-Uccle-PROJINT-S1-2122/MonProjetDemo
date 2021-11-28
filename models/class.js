const { DataTypes, Model } = require('sequelize');
const connection = require('./connection');

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

module.exports = Class;
