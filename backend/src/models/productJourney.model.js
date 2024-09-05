// src/models/productJourney.model.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
  
const ProductJourney = sequelize.define('ProductJourney', {
    ProductJourneyID: {
      type: Sequelize.INTEGER,
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
    ProductJourneyName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    ProductJourneyDescription: {
      type: Sequelize.STRING(512),
      allowNull: false,
    },
    DefaultMessageTemplate: {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    },
    ProductJourneyIndex: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
    tableName: 'ProductJourney',
    timestamps: false
  });
  
  module.exports = ProductJourney;
  