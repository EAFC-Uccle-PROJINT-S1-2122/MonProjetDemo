// Load all defined models
require('./schema');

const sequelize = require('./connection');
const debug = require("debug")("monprojetdemo:schema");

(async () => {
  debug("Dropping tables...");
  await sequelize.drop();
  debug("Tables dropped.")

  await sequelize.close();
})();
