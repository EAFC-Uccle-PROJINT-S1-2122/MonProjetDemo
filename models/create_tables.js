// Load all defined models
require('./schema');

const sequelize = require('./connection');

(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
})();
