const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const MessageTemplate = sequelize.define('MessageTemplate', {
  ProductID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Product',
      key: 'ProductID',
    },
  },
  ProductJourneyID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'ProductJourney',
      key: 'ProductJourneyID',
    },
  },
  MessageTemplate: {
    type: Sequelize.TEXT('long'),
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
  tableName: 'MessageTemplate',
  timestamps: false
});

module.exports = MessageTemplate;
