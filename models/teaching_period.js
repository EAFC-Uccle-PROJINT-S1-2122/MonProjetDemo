const { DataTypes, Model } = require("sequelize");
const connection = require("./connection");

class TeachingPeriod extends Model {}

TeachingPeriod.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    beginning: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  { sequelize: connection, modelName: "teachingPeriod", tableName: "teaching_periods" }
);

module.exports = TeachingPeriod;
