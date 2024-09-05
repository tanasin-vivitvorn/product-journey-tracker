const SupplierAttributeRepository = require('../repositories/SupplierAttributeRepository');

class SupplierAttributeService {
  async createSupplierAttribute(data) {
    return await SupplierAttributeRepository.create(data);
  }

  async getAllSupplierAttributes() {
    return await SupplierAttributeRepository.findAll();
  }

  async getSupplierAttributeById(id) {
    return await SupplierAttributeRepository.findById(id);
  }

  async updateSupplierAttribute(id, data) {
    return await SupplierAttributeRepository.update(id, data);
  }

  async deleteSupplierAttribute(id) {
    return await SupplierAttributeRepository.delete(id);
  }
}

module.exports = new SupplierAttributeService();
