const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ProductAttribute = sequelize.define('ProductAttribute', {
  ProductAttributeID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Product',
      key: 'ProductID'
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
  tableName: 'ProductAttribute',
  timestamps: false
});

module.exports = ProductAttribute;
