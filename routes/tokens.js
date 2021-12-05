const express = require("express");
const router = express.Router();
const debug = require("debug")("monprojetdemo:api:tokens");
const { Teacher } = require("../models/schema");
const { verify } = require("../password_hash");
const jwt = require("jsonwebtoken");
const jwt_config = require("../jwt_config");

/* GET users listing. */
router.post("/generate", async function (req, res, next) {
  debug("Generate tokens");
  const username = req.body.username;
  const passwordToVerify = req.body.password;
  const teacher = await Teacher.findOne({
    where: {
      username: username,
    },
  });
  if (
    teacher != null &&
    (await verify(teacher.passwordHash, passwordToVerify))
  ) {
    const payload = {
      sub: teacher.id,
      name: [teacher.firstName, teacher.lastName].join(" "),
    };
    const token = jwt.sign(payload, jwt_config.secret, jwt_config.options);
    res.json({ token: token });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
