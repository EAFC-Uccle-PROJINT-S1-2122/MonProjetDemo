const express = require("express");
const router = express.Router();
const debug = require("debug")("monprojetdemo:api:classes");
const { Class, EducationUnit, Teacher } = require("../models/schema");

router.get("/", async function (req, res, next) {
  const classes = await Class.findAll({
    order: [["shortName"]],
    include: [Teacher, EducationUnit],
  });
  res.json(classes);
});

module.exports = router;
