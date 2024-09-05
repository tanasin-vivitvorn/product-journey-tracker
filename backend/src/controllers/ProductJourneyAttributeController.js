const ProductJourneyAttributeService = require('../services/ProductJourneyAttributeService');
const { plainToInstance } = require('class-transformer');
const { validate } = require('class-validator');
const { CreateProductJourneyAttributeDTO } = require('../../dist/CreateProductJourneyAttributeDTO');

exports.createProductJourneyAttribute = async (req, res) => {
  const dto = plainToInstance(CreateProductJourneyAttributeDTO, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const attribute = await ProductJourneyAttributeService.createProductJourneyWithAttributes(req.body);
    console.log(attribute);
    res.status(201).json(attribute);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProductJourneyAttributes = async (req, res) => {
  try {
    const attributes = await ProductJourneyAttributeService.getAllProductJourneyAttributes();
    res.status(200).json(attributes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProductJourneyAttributeById = async (req, res) => {
  try {
    const attribute = await ProductJourneyAttributeService.getProductJourneyAttributeById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ error: 'ProductJourneyAttribute not found' });
    }
    res.status(200).json(attribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a ProductJourneyAttribute
exports.updateProductJourneyAttribute = async (req, res) => {
  const dto = plainToInstance(CreateProductJourneyAttributeDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const attribute = await ProductJourneyAttributeService.updateProductJourneyAttribute(req.params.id, req.body);
    if (!attribute) {
      return res.status(404).json({ error: 'ProductJourneyAttribute not found' });
    }
    res.status(200).json(attribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Soft delete a ProductJourneyAttribute by setting IsVisible to false
exports.deleteProductJourneyAttribute = async (req, res) => {
  try {
    const attribute = await ProductJourneyAttributeService.deleteProductJourneyAttribute(req.params.id);
    if (!attribute) {
      return res.status(404).json({ error: 'ProductJourneyAttribute not found' });
    }
    res.status(200).json(attribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
