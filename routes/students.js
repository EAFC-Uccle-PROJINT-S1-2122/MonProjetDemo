const express = require('express');
const router = express.Router();
const debug = require('debug')('monprojetdemo:api:student');
const Student = require('../models/student');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  debug("List students");
  const students = await Student.findAll();
  res.json(students);
});

router.post('/', async (req, res) => {
  debug("Create new student");
  const newStudent = req.body;
  const storedStudent = await Student.create(newStudent);
  const generatedId = storedStudent.id;
  res.set("Location", `${req.baseUrl}/${generatedId}`)
  res.status(201).send("Student created");
});

router.get('/:id', async (req, res) => {
  debug("Get student details");
  const studentId = req.params.id;
  const student = await Student.findByPk(studentId);
  if (student !== null) {
    res.json(student);
  } else {
    res.status(404).send("Student not found");
  }
});

router.delete('/:id', async (req, res) => {
  debug("Delete student");
  const studentId = req.params.id;
  const student = await Student.findByPk(studentId);
  if (student !== null) {
    await student.destroy();
    res.status(204).send("Student deleted");
  } else {
    res.status(404).send("Student not found");
  }
});

module.exports = router;
