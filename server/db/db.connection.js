const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    pool: {
      acquire: +process.env.POOL_ACQUIRE,
      min: +process.env.POOL_MIN, //
      max: +process.env.POOL_MAX,
      idle: +process.env.POOL_IDLE,
    },
  }
);

const db = {
  sequelize,
  Sequelize,
  Tutorial: require("./models/tutorial.model")(sequelize, Sequelize),
};

module.exports = db;
