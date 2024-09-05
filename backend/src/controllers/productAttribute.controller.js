const ProductAttributeService = require('../services/ProductAttributeService');
const { plainToInstance } = require('class-transformer');
const { validate } = require('class-validator');
const { CreateProductAttributeDTO } = require('../../dist/CreateProductAttributeDTO');

// Create a new ProductAttribute
exports.createProductAttribute = async (req, res) => {
  const dto = plainToInstance(CreateProductAttributeDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const productAttribute = await ProductAttributeService.createProductAttribute(req.body);
    res.status(201).json(productAttribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ProductAttributes
exports.getAllProductAttributes = async (req, res) => {
  try {
    const productAttributes = await ProductAttributeService.getAllProductAttributes();
    res.status(200).json(productAttributes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single ProductAttribute by ID
exports.getProductAttributeById = async (req, res) => {
  try {
    const productAttribute = await ProductAttributeService.getProductAttributeById(req.params.id);
    if (!productAttribute) {
      return res.status(404).json({ error: 'ProductAttribute not found' });
    }
    res.status(200).json(productAttribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a ProductAttribute
exports.updateProductAttribute = async (req, res) => {
  const dto = plainToInstance(CreateProductAttributeDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const productAttribute = await ProductAttributeService.updateProductAttribute(req.params.id, req.body);
    if (!productAttribute) {
      return res.status(404).json({ error: 'ProductAttribute not found' });
    }
    res.status(200).json(productAttribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a ProductAttribute
exports.deleteProductAttribute = async (req, res) => {
  try {
    const success = await ProductAttributeService.deleteProductAttribute(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'ProductAttribute not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
