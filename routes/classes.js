const express = require("express");
const router = express.Router();
const debug = require("debug")("monprojetdemo:api:class");
const { Class, EducationUnit, Student, Teacher } = require("../models/schema");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    debug(`List classes [user ${req.user.username}]`);
    const roles = await req.user.getRoles();
    if (roles.find((role) => role.name === "admin")) {
      const classes = await Class.findAll({
        include: [EducationUnit, Teacher],
      });
      res.json(classes);
    } else {
      res.sendStatus(403);
    }
  }
);

router.get(
  "/:class_id",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    debug(`Get class ${req.params.class_id} [user ${req.user.username}]`);
    const roles = await req.user.getRoles();
    if (roles.find((role) => role.name === "admin")) {
      const foundClass = await Class.findByPk(req.params.class_id, {
        include: ["teacher", "educationUnit"],
      });
      res.json(foundClass);
    } else {
      res.sendStatus(403);
    }
  }
);

router.get(
  "/:class_id/students",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    debug(
      `Get students for class ${req.params.class_id} [user ${req.user.username}]`
    );
    const roles = await req.user.getRoles();
    if (roles.find((role) => role.name === "admin")) {
      const studentList = await Student.findAndCountAll({
        include: [{ model: Class, where: { id: req.params.class_id } }],
        order: ["firstName", "lastName"],
        limit: parseInt(req.query.limit, 10),
        offset: parseInt(req.query.offset, 10),
      });
      res.json(studentList);
    } else {
      res.sendStatus(403);
    }
  }
);

module.exports = router;
