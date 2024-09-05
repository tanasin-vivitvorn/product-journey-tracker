const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Supplier = sequelize.define('Supplier', {
  SupplierID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  SupplierName: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  IsVisible: {
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
  tableName: 'Supplier',
  timestamps: false
});

module.exports = Supplier;
