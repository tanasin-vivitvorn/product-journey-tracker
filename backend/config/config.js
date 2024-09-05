require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "mysecretpassword",
    database: process.env.DB_NAME || "swu",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: process.env.DB_LOGGING === 'true',
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "mysecretpassword",
    database: process.env.DB_NAME || "swu_test",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: process.env.DB_LOGGING === 'true',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: process.env.DB_LOGGING === 'true',
  }
};