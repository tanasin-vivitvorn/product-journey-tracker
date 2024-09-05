// src/models/role.model.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Role = sequelize.define('Role', {
  RoleID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  RoleName: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING(256),
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
  tableName: 'Role',
  timestamps: false
});

module.exports = Role;
