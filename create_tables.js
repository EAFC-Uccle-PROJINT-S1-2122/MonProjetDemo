require('./models/user_model');
const { sequelize } = require("./models/db_connection.js");

(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
})();
