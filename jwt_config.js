const secret =
  "This is the best secret I can think of at the moment! Don't laugh! This could, indeed, be a very secure passphrase";
const issuer = "MonProjetDemo token system";
const audience = "MonProjetDemo API users";

const options = {
  issuer: issuer,
  audience: audience,
  expiresIn: "24h",
};

module.exports = {
  secret,
  options,
};
