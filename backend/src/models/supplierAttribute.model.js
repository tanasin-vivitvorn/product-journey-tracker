const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SupplierAttribute = sequelize.define('SupplierAttribute', {
  SupplierAttributeID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  SupplierID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Supplier',
      key: 'SupplierID'
    }
  },
  FieldTemplate: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  Answer: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  Value: {
    type: DataTypes.STRING(256),
    allowNull: true,
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
  tableName: 'SupplierAttribute',
  timestamps: false
});

module.exports = SupplierAttribute;
