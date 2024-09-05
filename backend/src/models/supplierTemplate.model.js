const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SupplierTemplate = sequelize.define('SupplierTemplate', {
  SupplierTemplateID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  FieldTemplate: {
    type: DataTypes.JSON,
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
  tableName: 'SupplierTemplate',
  timestamps: false
});

module.exports = SupplierTemplate;
