const debug = require("debug")("monprojetdemo:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining Teacher model...");

class Teacher extends Model {}

Teacher.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: connection, modelName: "teacher" }
);

debug("Teacher model defined.");

module.exports = Teacher;
