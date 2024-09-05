const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Permission = sequelize.define('Permission', {
  PermissionID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  PermissionName: {
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
  tableName: 'Permission',
  timestamps: false
});

module.exports = Permission;
