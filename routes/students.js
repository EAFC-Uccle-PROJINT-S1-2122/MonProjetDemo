const express = require("express");
const router = express.Router();
const debug = require("debug")("monprojetdemo:api:student");
const { Student, Class, EducationUnit } = require("../models/schema");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  debug("List students");
  const students = await Student.findAll();
  res.json(students);
});

router.post("/", async (req, res) => {
  debug("Create new student");
  const newStudent = req.body;
  const storedStudent = await Student.create(newStudent);
  const generatedId = storedStudent.id;
  res.set("Location", `${req.baseUrl}/${generatedId}`);
  res.status(201).send("Student created");
});

router.get("/:id", async (req, res) => {
  debug("Get student details");
  const studentId = req.params.id;
  const student = await Student.findByPk(studentId);
  if (student !== null) {
    res.json(student);
  } else {
    res.sendStatus(404);
  }
});

router.get("/:id/classes", async (req, res, next) => {
  const studentId = req.params.id;
  const student = await Student.findByPk(studentId);
  if (student !== null) {
    const studentClasses = await student.getClasses({
      include: [EducationUnit],
    });
    res.json(studentClasses);
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", async (req, res) => {
  debug("Delete student");
  const studentId = req.params.id;
  const student = await Student.findByPk(studentId);
  if (student !== null) {
    await student.destroy();
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
