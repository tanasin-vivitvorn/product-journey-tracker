const ProductTypeService = require('../services/ProductTypeService');
const { plainToInstance } = require('class-transformer');
const { validate } = require('class-validator');
const { CreateProductTypeDTO } = require('../../dist/CreateProductTypeDTO');

// Create a new ProductType
exports.createProductType = async (req, res) => {
  const dto = plainToInstance(CreateProductTypeDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const productType = await ProductTypeService.createProductType(req.body);
    res.status(201).json(productType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ProductTypes
exports.getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductTypeService.getAllProductTypes();
    res.status(200).json(productTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single ProductType by ID
exports.getProductTypeById = async (req, res) => {
  try {
    const productType = await ProductTypeService.getProductTypeById(req.params.id);
    if (!productType) {
      return res.status(404).json({ error: 'ProductType not found' });
    }
    res.status(200).json(productType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a ProductType
exports.updateProductType = async (req, res) => {
  const dto = plainToInstance(CreateProductTypeDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const productType = await ProductTypeService.updateProductType(req.params.id, req.body);
    if (!productType) {
      return res.status(404).json({ error: 'ProductType not found' });
    }
    res.status(200).json(productType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a ProductType
exports.deleteProductType = async (req, res) => {
  try {
    const success = await ProductTypeService.deleteProductType(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'ProductType not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchProductTypes = async (req, res) => {
  const { searchQuery = '', page = 1, pageSize = 10 } = req.query;

  // Convert `page` and `pageSize` to integers, handling any invalid inputs
  const pageInt = parseInt(page, 10);
  const pageSizeInt = parseInt(pageSize, 10);

  if (isNaN(pageInt) || isNaN(pageSizeInt)) {
    return res.status(400).json({ error: 'Page and pageSize must be valid integers.' });
  }

  try {
    const result = await ProductTypeService.searchProductTypes({ searchQuery, page: pageInt, pageSize: pageSizeInt });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
