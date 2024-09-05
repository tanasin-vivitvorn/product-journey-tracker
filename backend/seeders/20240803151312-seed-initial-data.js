'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed Roles
    await queryInterface.bulkInsert('Roles', [
      { RoleName: 'Admin', Description: 'Administrator role', CreateAt: new Date(), CreateBy: 1 },
      { RoleName: 'User', Description: 'Standard user role', CreateAt: new Date(), CreateBy: 1 }
    ], {});

    // Get the inserted Roles
    const roles = await queryInterface.sequelize.query(
      `SELECT "RoleID" from "Roles";`
    );
    const roleRows = roles[0];

    // Seed Users
    await queryInterface.bulkInsert('Users', [
      {
        UserName: 'admin',
        FullName: 'Admin User',
        Email: 'admin@example.com',
        RoleID: roleRows[0].RoleID,  // Admin role
        Password: bcrypt.hashSync('adminpassword', 8),
        IsActive: true,
        CreateAt: new Date(),
        CreateBy: 1
      },
      {
        UserName: faker.internet.userName(),
        FullName: faker.person.fullName(),
        Email: faker.internet.email(),
        RoleID: roleRows[1].RoleID,  // User role
        Password: bcrypt.hashSync('userpassword', 8),
        IsActive: true,
        CreateAt: new Date(),
        CreateBy: 1
      }
    ], {});

    // Seed Permissions
    await queryInterface.bulkInsert('Permissions', [
      { PermissionName: 'CREATE_PRODUCT', Description: 'Permission to create a product', CreateAt: new Date(), CreateBy: 1 },
      { PermissionName: 'UPDATE_PRODUCT', Description: 'Permission to update a product', CreateAt: new Date(), CreateBy: 1 },
      { PermissionName: 'DELETE_PRODUCT', Description: 'Permission to delete a product', CreateAt: new Date(), CreateBy: 1 },
    ], {});

    // Get the inserted Permissions
    const permissions = await queryInterface.sequelize.query(
      `SELECT "PermissionID" from "Permissions";`
    );
    const permissionRows = permissions[0];

    // Seed RolePermissions
    await queryInterface.bulkInsert('RolePermissions', [
      { RoleID: roleRows[0].RoleID, PermissionID: permissionRows[0].PermissionID, CreateAt: new Date(), CreateBy: 1 }, // Admin: CREATE_PRODUCT
      { RoleID: roleRows[0].RoleID, PermissionID: permissionRows[1].PermissionID, CreateAt: new Date(), CreateBy: 1 }, // Admin: UPDATE_PRODUCT
      { RoleID: roleRows[0].RoleID, PermissionID: permissionRows[2].PermissionID, CreateAt: new Date(), CreateBy: 1 }, // Admin: DELETE_PRODUCT
      { RoleID: roleRows[1].RoleID, PermissionID: permissionRows[0].PermissionID, CreateAt: new Date(), CreateBy: 1 }, // User: CREATE_PRODUCT
    ], {});

    // Seed ProductTypes
    await queryInterface.bulkInsert('ProductTypes', [
      { ProductTypeName: 'Electronics', CreateAt: new Date(), CreateBy: 1 },
      { ProductTypeName: 'Furniture', CreateAt: new Date(), CreateBy: 1 },
      { ProductTypeName: 'Clothing', CreateAt: new Date(), CreateBy: 1 },
    ], {});

    // Get the inserted ProductTypes
    const productTypes = await queryInterface.sequelize.query(
      `SELECT "ProductTypeID" from "ProductTypes";`
    );
    const productTypeRows = productTypes[0];

    // Seed Suppliers
    await queryInterface.bulkInsert('Suppliers', [
      { SupplierName: 'Supplier 1', IsVisible: true, CreateAt: new Date(), CreateBy: 1 },
      { SupplierName: 'Supplier 2', IsVisible: true, CreateAt: new Date(), CreateBy: 1 }
    ], {});

    // Get the inserted Suppliers
    const suppliers = await queryInterface.sequelize.query(
      `SELECT "SupplierID" from "Suppliers";`
    );
    const supplierRows = suppliers[0];

    // Seed Products
    await queryInterface.bulkInsert('Products', [
      {
        ProductName: faker.commerce.productName(),
        ProductType: productTypeRows[0].ProductTypeID, // Electronics
        Supplier: supplierRows[0].SupplierID,  // Supplier 1
        IsVisible: true,
        CreateAt: new Date(),
        CreateBy: 1
      },
      {
        ProductName: faker.commerce.productName(),
        ProductType: productTypeRows[1].ProductTypeID, // Furniture
        Supplier: supplierRows[1].SupplierID,  // Supplier 2
        IsVisible: true,
        CreateAt: new Date(),
        CreateBy: 1
      },
      {
        ProductName: faker.commerce.productName(),
        ProductType: productTypeRows[2].ProductTypeID, // Clothing
        Supplier: supplierRows[0].SupplierID,  // Supplier 1
        IsVisible: true,
        CreateAt: new Date(),
        CreateBy: 1
      }
    ], {});

    // Get the inserted Products
    const products = await queryInterface.sequelize.query(
      `SELECT "ProductID" from "Products";`
    );
    const productRows = products[0];

    // Seed ProductAttributes
    for (const product of productRows) {
      await queryInterface.bulkInsert('ProductAttributes', [
        {
          ProductID: product.ProductID,
          FieldID: 'Color',
          Value: faker.color.human(),
          CreateAt: new Date(),
          CreateBy: 1
        },
        {
          ProductID: product.ProductID,
          FieldID: 'Size',
          Value: faker.helpers.arrayElement(['Small', 'Medium', 'Large']),
          CreateAt: new Date(),
          CreateBy: 1
        }
      ], {});
    }

    // Seed ProductJourneys
    for (const product of productRows) {
      await queryInterface.bulkInsert('ProductJourneys', [
        {
          ProductID: product.ProductID,
          FieldID: 'Manufactured',
          Value: faker.date.past().toISOString(),
          IsVisible: true,
          CreateAt: new Date(),
          CreateBy: 1
        },
        {
          ProductID: product.ProductID,
          FieldID: 'Shipped',
          Value: faker.date.recent().toISOString(),
          IsVisible: true,
          CreateAt: new Date(),
          CreateBy: 1
        },
        {
          ProductID: product.ProductID,
          FieldID: 'Delivered',
          Value: faker.date.recent().toISOString(),
          IsVisible: true,
          CreateAt: new Date(),
          CreateBy: 1
        }
      ], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductJourneys', null, {});
    await queryInterface.bulkDelete('ProductAttributes', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Suppliers', null, {});
    await queryInterface.bulkDelete('ProductTypes', null, {});
    await queryInterface.bulkDelete('RolePermissions', null, {});
    await queryInterface.bulkDelete('Permissions', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
