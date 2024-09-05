const ProductJourneyService = require('../services/ProductJourneyService');
const { plainToInstance } = require('class-transformer');
const { validate } = require('class-validator');
const { CreateProductJourneyDTO } = require('../../dist/CreateProductJourneyDTO');

// Create a new ProductJourney
exports.createProductJourney = async (req, res) => {
  console.log(req.body);
  const dto = plainToInstance(CreateProductJourneyDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const productJourney = await ProductJourneyService.createProductJourney(req.body);
    res.status(201).json(productJourney);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ProductJourneys
exports.getAllProductJourneys = async (req, res) => {
  try {
    const productJourneys = await ProductJourneyService.getAllProductJourneys();
    res.status(200).json(productJourneys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single ProductJourney by ID
exports.getProductJourneyById = async (req, res) => {
  try {
    const productJourney = await ProductJourneyService.getProductJourneyById(req.params.id);
    if (!productJourney) {
      return res.status(404).json({ error: 'ProductJourney not found' });
    }
    res.status(200).json(productJourney);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a ProductJourney
exports.updateProductJourney = async (req, res) => {
  const dto = plainToInstance(CreateProductJourneyDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const productJourney = await ProductJourneyService.updateProductJourney(req.params.id, req.body);
    if (!productJourney) {
      return res.status(404).json({ error: 'ProductJourney not found' });
    }
    res.status(200).json(productJourney);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a ProductJourney
exports.deleteProductJourney = async (req, res) => {
  try {
    const success = await ProductJourneyService.deleteProductJourney(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'ProductJourney not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
