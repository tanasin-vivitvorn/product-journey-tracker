// src/models/productJourney.model.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ProductJourneyAttribute = sequelize.define('ProductJourneyAttribute', {
  ProductJourneyAttributeID: {
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
  ProductJourneyID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ProductJourney',
      key: 'ProductJourneyID'
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
  tableName: 'ProductJourneyAttribute',
  timestamps: false
});

module.exports = ProductJourneyAttribute;
