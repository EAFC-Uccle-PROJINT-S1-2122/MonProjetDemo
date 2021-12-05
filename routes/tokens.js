const express = require("express");
const router = express.Router();
const debug = require("debug")("monprojetdemo:api:tokens");
const { User } = require("../models/schema");
const { verify } = require("../password_hash");
const jwt = require("jsonwebtoken");
const jwt_config = require("../jwt_config");

/* GET users listing. */
router.post("/generate", async function (req, res, next) {
  debug("Generate tokens");
  const username = req.body.username;
  const passwordToVerify = req.body.password;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (user != null && (await verify(user.passwordHash, passwordToVerify))) {
    const payload = {
      sub: user.id,
      name: [user.firstName, user.lastName].join(" "),
    };
    const token = jwt.sign(payload, jwt_config.secret, jwt_config.options);
    res.json({ token: token });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
