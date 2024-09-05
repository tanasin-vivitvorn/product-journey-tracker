const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Product = sequelize.define('Product', {
  ProductID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ProductName: {
    type: Sequelize.STRING(256),
    allowNull: false,
  },
  ProductTypeID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'ProductType',
      key: 'ProductTypeID',
    },
  },
  SupplierID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Supplier',
      key: 'SupplierID',
    },
  },
  IsVisible: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  CreateAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  UpdateAt: {
    type: Sequelize.DATE,
  },
  CreateBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  UpdateBy: {
    type: Sequelize.INTEGER,
  }
}, {
  tableName: 'Product',
  timestamps: false
});

module.exports = Product;
