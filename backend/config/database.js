const { Sequelize } = require('sequelize');

// Load environment variables
const database = process.env.DB_NAME || 'swu';
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASSWORD || 'mysecretpassword';
const host = process.env.DB_HOST || 'localhost';
const dialect = process.env.DB_DIALECT || 'postgres';
const logging = process.env.DB_LOGGING === 'true'; // Default to false unless explicitly set to true

// Create a new Sequelize instance
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  logging: logging,
});

module.exports = sequelize;
