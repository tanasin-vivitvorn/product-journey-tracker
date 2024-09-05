const User = require('./user.model');
const Role = require('./role.model');
const Permission = require('./permission.model');
const RolePermission = require('./rolePermission.model');
const ProductType = require('./productType.model');
const Supplier = require('./supplier.model');
const SupplierAttribute = require('./supplierAttribute.model');
const SupplierTemplate = require('./supplierTemplate.model');
const Product = require('./product.model');
const ProductAttribute = require('./productAttribute.model');
const ProductJourney = require('./productJourney.model');
const ProductJourneyAttribute = require('./productJourneyAttribute.model');
const ProductJourneyTemplate = require('./productJourneyTemplate.model');
const ProductTemplate = require('./productTemplate.model');
const MessageTemplate = require('./messageTemplate.model');

// Relationships
User.belongsTo(Role, { foreignKey: 'RoleID' });
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'RoleID' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'PermissionID' });


Product.belongsTo(ProductType, { foreignKey: 'ProductTypeID'});
ProductType.hasMany(Product, { foreignKey: 'ProductTypeID'});
Product.hasMany(ProductAttribute, { foreignKey: 'ProductID'});
ProductAttribute.belongsTo(Product, { foreignKey: 'ProductID'});

ProductType.hasMany(ProductJourney, { foreignKey: 'ProductTypeID'});
ProductJourney.belongsTo(ProductType, { foreignKey: 'ProductTypeID'});
ProductTemplate.belongsTo(ProductType, { foreignKey: 'ProductTypeID'});
ProductType.hasMany(ProductTemplate, { foreignKey: 'ProductTypeID'});

Product.hasMany(ProductJourneyAttribute, { foreignKey: 'ProductID'});
ProductJourneyAttribute.belongsTo(Product, { foreignKey: 'ProductID'});
ProductJourney.hasMany(ProductJourneyAttribute, { foreignKey: 'ProductJourneyID'});
ProductJourneyAttribute.belongsTo(ProductJourney, { foreignKey: 'ProductJourneyID'});
ProductJourneyTemplate.belongsTo(ProductJourney, { foreignKey: 'ProductJourneyID'});
ProductJourney.hasMany(ProductJourneyTemplate, { foreignKey: 'ProductJourneyID'});

Product.hasOne(MessageTemplate, { foreignKey: 'ProductID'});
MessageTemplate.belongsTo(Product, { foreignKey: 'ProductID'});

ProductJourney.hasOne(MessageTemplate, { foreignKey: 'ProductJourneyID'});
MessageTemplate.belongsTo(ProductJourney, { foreignKey: 'ProductJourneyID'});

Supplier.hasMany(Product, { foreignKey: 'SupplierID'});
Product.belongsTo(Supplier, { foreignKey: 'SupplierID'});

Supplier.hasMany(SupplierAttribute, { foreignKey: 'SupplierID'});
SupplierAttribute.belongsTo(Supplier, { foreignKey: 'SupplierID'});


module.exports = {
  User,
  Role,
  Permission,
  RolePermission,
  Product,
  ProductAttribute,
  ProductJourney,
  ProductJourneyAttribute,
  ProductJourneyTemplate,
  ProductTemplate,
  ProductType,
  Supplier,
  SupplierAttribute,
  SupplierTemplate,
  MessageTemplate
};
