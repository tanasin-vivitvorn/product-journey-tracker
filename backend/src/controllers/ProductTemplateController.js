const ProductTemplateService = require('../services/ProductTemplateService');
const { plainToInstance } = require('class-transformer');
const { validate } = require('class-validator');
const { CreateProductTemplateDTO } = require('../../dist/CreateProductTemplateDTO');

// Create a new ProductTemplate
exports.createProductTemplate = async (req, res) => {
  const dto = plainToInstance(CreateProductTemplateDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const productTemplate = await ProductTemplateService.createProductTemplate(req.body);
    res.status(201).json(productTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ProductTemplates
exports.getAllProductTemplates = async (req, res) => {
  try {
    const productTemplates = await ProductTemplateService.getAllProductTemplates();
    res.status(200).json(productTemplates);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single ProductTemplate by ID
exports.getProductTemplateById = async (req, res) => {
  try {
    const productTemplate = await ProductTemplateService.getProductTemplateById(req.params.id);
    if (!productTemplate) {
      return res.status(404).json({ error: 'ProductTemplate not found' });
    }
    res.status(200).json(productTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a ProductTemplate
exports.updateProductTemplate = async (req, res) => {
  const dto = plainToInstance(CreateProductTemplateDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const productTemplate = await ProductTemplateService.updateProductTemplate(req.params.id, req.body);
    if (!productTemplate) {
      return res.status(404).json({ error: 'ProductTemplate not found' });
    }
    res.status(200).json(productTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a ProductTemplate
exports.deleteProductTemplate = async (req, res) => {
  try {
    const success = await ProductTemplateService.deleteProductTemplate(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'ProductTemplate not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
