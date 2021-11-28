const debug = require("debug")("monprojetdemo:schema");
const sequelize = require("./connection");
const {
  Class,
  EducationUnit,
  Student,
  Teacher,
  TeachingPeriod,
} = require("./schema");

(async () => {
  debug("Recreating tables...");
  await sequelize.sync({ force: true });

  debug("Importing samples...");

  const thierno = await Student.create({
    firstName: "Thierno",
    lastName: "Barry",
  });
  const nadege = await Student.create({
    firstName: "Nadège",
    lastName: "Mukashema",
  });
  const michael = await Student.create({
    firstName: "Michael",
    lastName: "Abou-Zeid",
  });
  const jonathan = await Student.create({
    firstName: "Jonthan",
    lastName: "Degrave",
  });
  const hatim = await Student.create({
    firstName: "Hatim",
    lastName: "Naimi",
  });
  const carole = await Student.create({
    firstName: "Carole",
    lastName: "Guedem Noumbissie",
  });

  const projweb = await EducationUnit.create({
    name: "Projet de développement Web",
  });
  const projint = await EducationUnit.create({
    name: "Projet d'intégration de développement",
  });

  const projweb2_s1_2122 = await Class.create({
    academicYear: "2021-2022",
    shortName: "PROJWEB2_S1_2122",
  });
  const projint_s1_2122 = await Class.create({
    academicYear: "2021-2022",
    shortName: "PROJINT_S1_2122",
  });

  const p20211122_am = await TeachingPeriod.create({
    date: "2021-11-22",
    beginning: "09:00",
    end: "12:30",
  });
  const p20211129_am = await TeachingPeriod.create({
    date: "2021-11-29",
    beginning: "09:00",
    end: "12:30",
  });
  const p20211122_pm = await TeachingPeriod.create({
    date: "2021-11-22",
    beginning: "13:20",
    end: "16:50",
  });
  const p20211129_pm = await TeachingPeriod.create({
    date: "2021-11-29",
    beginning: "13:20",
    end: "16:50",
  });

  const mr_roland = await Teacher.create({
    firstName: "François",
    lastName: "Roland",
  });

  await projweb2_s1_2122.setEducationUnit(projweb);
  await projweb2_s1_2122.setTeacher(mr_roland);
  await projweb2_s1_2122.addStudents([carole, jonathan, michael]);
  await projweb2_s1_2122.addTeachingPeriod(p20211122_am);
  await projweb2_s1_2122.addTeachingPeriod(p20211129_am);

  await projint_s1_2122.setEducationUnit(projint);
  await projint_s1_2122.setTeacher(mr_roland);
  await projint_s1_2122.addStudents([hatim, nadege, thierno]);
  await projint_s1_2122.addTeachingPeriod(p20211122_pm);
  await projint_s1_2122.addTeachingPeriod(p20211129_pm);

  debug("Samples imported.");

  await sequelize.close();
})();
