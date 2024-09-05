const ProductJourneyTemplateService = require('../services/ProductJourneyTemplateService');
const { plainToInstance } = require('class-transformer');
const { validate } = require('class-validator');
const { CreateProductJourneyTemplateDTO } = require('../../dist/CreateProductJourneyTemplateDTO');

// Create a new ProductJourneyTemplate
exports.createProductJourneyTemplate = async (req, res) => {
  const dto = plainToInstance(CreateProductJourneyTemplateDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const productJourneyTemplate = await ProductJourneyTemplateService.createProductJourneyTemplate(req.body);
    res.status(201).json(productJourneyTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ProductJourneyTemplates
exports.getAllProductJourneyTemplates = async (req, res) => {
  try {
    const productJourneyTemplates = await ProductJourneyTemplateService.getAllProductJourneyTemplates();
    res.status(200).json(productJourneyTemplates);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single ProductJourneyTemplate by ID
exports.getProductJourneyTemplateById = async (req, res) => {
  try {
    const productJourneyTemplate = await ProductJourneyTemplateService.getProductJourneyTemplateById(req.params.id);
    if (!productJourneyTemplate) {
      return res.status(404).json({ error: 'ProductJourneyTemplate not found' });
    }
    res.status(200).json(productJourneyTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a ProductJourneyTemplate
exports.updateProductJourneyTemplate = async (req, res) => {
  const dto = plainToInstance(CreateProductJourneyTemplateDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const productJourneyTemplate = await ProductJourneyTemplateService.updateProductJourneyTemplate(req.params.id, req.body);
    if (!productJourneyTemplate) {
      return res.status(404).json({ error: 'ProductJourneyTemplate not found' });
    }
    res.status(200).json(productJourneyTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a ProductJourneyTemplate
exports.deleteProductJourneyTemplate = async (req, res) => {
  try {
    const success = await ProductJourneyTemplateService.deleteProductJourneyTemplate(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'ProductJourneyTemplate not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
