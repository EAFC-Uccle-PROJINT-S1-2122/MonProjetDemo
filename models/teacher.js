const { DataTypes, Model } = require("sequelize");
const connection = require("./connection");

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

module.exports = Teacher;
