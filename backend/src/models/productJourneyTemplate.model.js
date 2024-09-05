const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ProductJourneyTemplate = sequelize.define('ProductJourneyTemplate', {
  ProductJourneyTemplateID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ProductJourneyID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'ProductJourney',
      key: 'ProductJourneyID',
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
  tableName: 'ProductJourneyTemplate',
  timestamps: false
});

module.exports = ProductJourneyTemplate;
