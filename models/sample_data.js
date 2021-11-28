const {
  Class,
  EducationUnit,
  Student,
  Teacher,
  TeachingPeriod,
} = require("./schema");

(async () => {
  const hatim = await Student.create({
    firstName: "Hatim",
    lastName: "Naimi",
  });
  const nadege = await Student.create({
    firstName: "Nadège",
    lastName: "Mukashema",
  });
  const thierno = await Student.create({
    firstName: "Thierno",
    lastName: "Barry",
  });

  const projint = await EducationUnit.create({
    name: "Projet d'intégration de développement",
  });

  const projint_s1_2122 = await Class.create({
    academicYear: "2021-2022",
    shortName: "PROJINT_S1_2122",
  });

  p20211129_1320 = await TeachingPeriod.create({
    date: "2021-11-29",
    beginning: "13:20",
    end: "16:50"
  });

  await projint.addClass(projint_s1_2122);
  await projint_s1_2122.addStudents([hatim, nadege, thierno]);
  await projint_s1_2122.addTeachingPeriod(p20211129_1320);

})();
