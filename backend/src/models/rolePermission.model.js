const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const RolePermission = sequelize.define('RolePermission', {
  RoleID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Role',
      key: 'RoleID'
    }
  },
  PermissionID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Permission',
      key: 'PermissionID'
    }
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
  tableName: 'RolePermissions',
  timestamps: false,
  primaryKey: false,
  indexes: [
    {
      unique: true,
      fields: ['RoleID', 'PermissionID']
    }
  ]
});

module.exports = RolePermission;
