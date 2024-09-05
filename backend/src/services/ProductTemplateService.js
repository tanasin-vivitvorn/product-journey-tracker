const ProductTemplateRepository = require('../repositories/ProductTemplateRepository');

class ProductTemplateService {
  async createProductTemplate(data) {
    return await ProductTemplateRepository.create(data);
  }

  async getAllProductTemplates() {
    return await ProductTemplateRepository.findAll();
  }

  async getProductTemplateById(id) {
    return await ProductTemplateRepository.findById(id);
  }

  async updateProductTemplate(id, data) {
    return await ProductTemplateRepository.update(id, data);
  }

  async deleteProductTemplate(id) {
    return await ProductTemplateRepository.delete(id);
  }
}

module.exports = new ProductTemplateService();
