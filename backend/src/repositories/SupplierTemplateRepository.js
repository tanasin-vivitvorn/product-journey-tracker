const SupplierTemplate = require('../models/supplierTemplate.model');

class SupplierTemplateRepository {
  async create(data) {
    return await SupplierTemplate.create(data);
  }

  async findAll() {
    return await SupplierTemplate.findAll();
  }

  async findById(id) {
    return await SupplierTemplate.findByPk(id);
  }

  async update(id, data) {
    const supplierTemplate = await SupplierTemplate.findByPk(id);
    if (supplierTemplate) {
      return await supplierTemplate.update(data);
    }
    return null;
  }

  async delete(id) {
    const supplierTemplate = await SupplierTemplate.findByPk(id);
    if (supplierTemplate) {
      await supplierTemplate.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new SupplierTemplateRepository();
