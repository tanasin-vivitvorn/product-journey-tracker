'use strict';

const fs = require('fs');
const path = require('path');

// Specify the order of table creation
const tableCreationOrder = [
    "User",
    "Permission",
    "Role",
    "RolePermission",
    "ProductType",
    "ProductTemplate",
    "SupplierTemplate",
    "Supplier",
    "SupplierAttribute",
    "Product",
    "ProductAttribute",
    "ProductJourney",
    "ProductJourneyTemplate",
    "ProductJourneyAttribute",
    "MessageTemplate"
];

// Function to dynamically import all models
const importModels = () => {
  const modelsDir = path.join(__dirname, '../src/models');
  const models = {};

  fs.readdirSync(modelsDir)
    .filter(file => file.endsWith('.model.js'))
    .forEach(file => {
      const model = require(path.join(modelsDir, file));
      console.log('Load', model.name);
      models[model.name] = model;
    });

  return models;
};

// Function to create constraints for a model
const createConstraints = async (queryInterface, model) => {
  const attributes = model.rawAttributes;

  for (const [attributeName, attribute] of Object.entries(attributes)) {
    // Add foreign key constraints
    if (attribute.references) {
      await queryInterface.addConstraint(model.tableName, {
        fields: [attributeName],
        type: 'foreign key',
        name: `fk_${model.name.toLowerCase()}_${attribute.references.model.toLowerCase()}`,
        references: {
          table: attribute.references.model,
          field: attribute.references.key
        },
        onDelete: attribute.onDelete || 'CASCADE',
        onUpdate: attribute.onUpdate || 'CASCADE'
      });
    }

    // Add unique constraints
    if (attribute.unique) {
      await queryInterface.addConstraint(model.tableName, {
        fields: [attributeName],
        type: 'unique',
        name: `unique_${model.name.toLowerCase()}_${attributeName.toLowerCase()}`
      });
    }
  }

  // Add indexes
  if (model.options.indexes) {
    for (const index of model.options.indexes) {
      await queryInterface.addIndex(
        model.tableName,
        index.fields,
        index.options
      );
    }
  }
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const models = importModels();
    // Create tables in specified order
    for (const modelName of tableCreationOrder) {
      const model = models[modelName];
      if (model) {
        console.log(model.rawAttributes);
        await queryInterface.createTable(
          model.tableName,
          model.rawAttributes,
          {
            timestamps: model.options.timestamps,
          }
        );
        console.log(`Created table: ${model.tableName}`);
      } else {
        console.warn(`Model ${modelName} not found. Skipping.`);
      }
    }

    // Add constraints and indexes for all tables
    for (const model of Object.values(models)) {
      await createConstraints(queryInterface, model);
      console.log(`Added constraints and indexes for: ${model.tableName}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const models = importModels();

    // Drop tables in reverse order of creation
    const allModelNames = [...tableCreationOrder, ...Object.keys(models).filter(name => !tableCreationOrder.includes(name))];
    for (const modelName of allModelNames.reverse()) {
      const model = models[modelName];
      if (model) {
        await queryInterface.dropTable(model.tableName);
        console.log(`Dropped table: ${model.tableName}`);
      }
    }
  }
};