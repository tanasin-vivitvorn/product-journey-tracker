const ProductJourneyTemplateRepository = require('../repositories/ProductJourneyTemplateRepository');

class ProductJourneyTemplateService {
  async createProductJourneyTemplate(data) {
    return await ProductJourneyTemplateRepository.create(data);
  }

  async getAllProductJourneyTemplates() {
    return await ProductJourneyTemplateRepository.findAll();
  }

  async getProductJourneyTemplateById(id) {
    return await ProductJourneyTemplateRepository.findById(id);
  }

  async updateProductJourneyTemplate(id, data) {
    return await ProductJourneyTemplateRepository.update(id, data);
  }

  async deleteProductJourneyTemplate(id) {
    return await ProductJourneyTemplateRepository.delete(id);
  }
}

module.exports = new ProductJourneyTemplateService();
