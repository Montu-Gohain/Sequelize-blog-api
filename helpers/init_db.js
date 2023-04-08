const { sequelize } = require("../models");

module.exports = async () => {
  await sequelize.authenticate();
  console.log("Database connected successfully.");
};
