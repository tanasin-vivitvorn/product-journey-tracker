const SupplierAttributeService = require('../services/SupplierAttributeService');
const { plainToInstance } = require('class-transformer');
const { validate } = require('class-validator');
const { CreateSupplierAttributeDTO } = require('../../dist/CreateSupplierAttributeDTO');

// Create a new SupplierAttribute
exports.createSupplierAttribute = async (req, res) => {
  const dto = plainToInstance(CreateSupplierAttributeDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const attribute = await SupplierAttributeService.createSupplierAttribute(req.body);
    res.status(201).json(attribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all SupplierAttributes
exports.getAllSupplierAttributes = async (req, res) => {
  try {
    const attributes = await SupplierAttributeService.getAllSupplierAttributes();
    res.status(200).json(attributes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single SupplierAttribute by ID
exports.getSupplierAttributeById = async (req, res) => {
  try {
    const attribute = await SupplierAttributeService.getSupplierAttributeById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ error: 'SupplierAttribute not found' });
    }
    res.status(200).json(attribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a SupplierAttribute
exports.updateSupplierAttribute = async (req, res) => {
  const dto = plainToInstance(CreateSupplierAttributeDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const attribute = await SupplierAttributeService.updateSupplierAttribute(req.params.id, req.body);
    if (!attribute) {
      return res.status(404).json({ error: 'SupplierAttribute not found' });
    }
    res.status(200).json(attribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a SupplierAttribute
exports.deleteSupplierAttribute = async (req, res) => {
  try {
    const success = await SupplierAttributeService.deleteSupplierAttribute(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'SupplierAttribute not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
