const Class = require("./class");
const EducationUnit = require("./education_unit");
const Student = require("./student");
const Teacher = require("./teacher");
const TeachingPeriod = require("./teaching_period");

Student.belongsToMany(Class, { through: "student_classes" });
Class.belongsToMany(Student, { through: "student_classes" });

EducationUnit.hasMany(Class);
Class.belongsTo(EducationUnit);

Class.hasMany(TeachingPeriod);
TeachingPeriod.belongsTo(Class);

Teacher.hasMany(Class);
Class.belongsTo(Teacher);

module.exports = {
  Class,
  EducationUnit,
  Student,
  Teacher,
  TeachingPeriod,
};
