const SupplierService = require('../services/SupplierService');
const { plainToInstance } = require('class-transformer');
const { validate } = require('class-validator');
const { CreateSupplierDTO, EditSupplierDTO } = require('../../dist/CreateSupplierDTO');

// Create a new Supplier
exports.createSupplier = async (req, res) => {
  const dto = plainToInstance(CreateSupplierDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const supplier = await SupplierService.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all visible Suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierService.getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single Supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await SupplierService.getSupplierById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    console.log(supplier);
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a Supplier
exports.updateSupplier = async (req, res) => {
  const dto = plainToInstance(CreateSupplierDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const supplier = await SupplierService.updateSupplier(req.body);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Soft delete a Supplier by setting IsVisible to false
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await SupplierService.deleteSupplier(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
