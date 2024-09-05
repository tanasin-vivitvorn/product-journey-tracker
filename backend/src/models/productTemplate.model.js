const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ProductTemplate = sequelize.define('ProductTemplate', {
  ProductTemplateID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ProductTypeID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'ProductType',
      key: 'ProductTypeID',
    },
  },
  FieldTemplate: {
    type: DataTypes.JSON,
    allowNull: false,
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
  tableName: 'ProductTemplate',
  timestamps: false
});

module.exports = ProductTemplate;
