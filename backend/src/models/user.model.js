const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  UserName: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  FullName: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(256),
    allowNull: false,
    unique: true,
  },
  RoleID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  CreateAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  UpdateAt: {
    type: DataTypes.DATE,
  },
  CreateBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UpdateBy: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'User',
  timestamps: false
});

module.exports = User;
