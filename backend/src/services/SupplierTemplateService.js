const SupplierTemplateRepository = require('../repositories/SupplierTemplateRepository');

class SupplierTemplateService {
  async createSupplierTemplate(data) {
    return await SupplierTemplateRepository.create(data);
  }

  async getAllSupplierTemplates() {
    return await SupplierTemplateRepository.findAll();
  }

  async getSupplierTemplateById(id) {
    return await SupplierTemplateRepository.findById(id);
  }

  async updateSupplierTemplate(id, data) {
    return await SupplierTemplateRepository.update(id, data);
  }

  async deleteSupplierTemplate(id) {
    return await SupplierTemplateRepository.delete(id);
  }
}

module.exports = new SupplierTemplateService();
