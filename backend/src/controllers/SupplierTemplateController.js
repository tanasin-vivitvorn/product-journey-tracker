const SupplierTemplateService = require('../services/SupplierTemplateService');
const { plainToInstance } = require('class-transformer');
const { validate } = require('class-validator');
const { CreateSupplierTemplateDTO } = require('../../dist/CreateSupplierTemplateDTO');

// Create a new SupplierTemplate
exports.createSupplierTemplate = async (req, res) => {
  const dto = plainToInstance(CreateSupplierTemplateDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const supplierTemplate = await SupplierTemplateService.createSupplierTemplate(req.body);
    res.status(201).json(supplierTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all SupplierTemplates
exports.getAllSupplierTemplates = async (req, res) => {
  try {
    const supplierTemplates = await SupplierTemplateService.getAllSupplierTemplates();
    res.status(200).json(supplierTemplates);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single SupplierTemplate by ID
exports.getSupplierTemplateById = async (req, res) => {
  try {
    const supplierTemplate = await SupplierTemplateService.getSupplierTemplateById(req.params.id);
    if (!supplierTemplate) {
      return res.status(404).json({ error: 'SupplierTemplate not found' });
    }
    res.status(200).json(supplierTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a SupplierTemplate
exports.updateSupplierTemplate = async (req, res) => {
  const dto = plainToInstance(CreateSupplierTemplateDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const supplierTemplate = await SupplierTemplateService.updateSupplierTemplate(req.params.id, req.body);
    if (!supplierTemplate) {
      return res.status(404).json({ error: 'SupplierTemplate not found' });
    }
    res.status(200).json(supplierTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a SupplierTemplate
exports.deleteSupplierTemplate = async (req, res) => {
  try {
    const success = await SupplierTemplateService.deleteSupplierTemplate(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'SupplierTemplate not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
