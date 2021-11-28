// Load all defined models
require('./models/schema');

const sequelize = require('./models/connection');

(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
})();
