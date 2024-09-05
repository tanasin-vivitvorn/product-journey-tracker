const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ProductType = sequelize.define('ProductType', {
  ProductTypeID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ProductTypeName: {
    type: Sequelize.STRING(256),
    allowNull: false,
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
  tableName: 'ProductType',
  timestamps: false
});

module.exports = ProductType;
