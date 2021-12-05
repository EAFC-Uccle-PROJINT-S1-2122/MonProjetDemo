const express = require("express");
const router = express.Router();
const debug = require("debug")("monprojetdemo:api:student");
const { Student, EducationUnit } = require("../models/schema");
const passport = require("passport");

/* GET users listing. */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    debug("List students");
    const students = await Student.findAll();
    res.json(students);
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    debug("Create new student");
    const newStudent = req.body;
    const storedStudent = await Student.create(newStudent);
    const generatedId = storedStudent.id;
    res.set("Location", `${req.baseUrl}/${generatedId}`);
    res.sendStatus(201);
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    debug("Get student details");
    const studentId = req.params.id;
    const student = await Student.findByPk(studentId);
    if (student !== null) {
      res.json(student);
    } else {
      res.sendStatus(404);
    }
  }
);

router.get(
  "/:id/classes",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
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
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    debug("Delete student");
    const studentId = req.params.id;
    const student = await Student.findByPk(studentId);
    if (student !== null) {
      await student.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);

module.exports = router;
