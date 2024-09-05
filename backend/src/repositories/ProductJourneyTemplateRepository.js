const ProductJourneyTemplate = require('../models/productJourneyTemplate.model');

class ProductJourneyTemplateRepository {
  async create(data) {
    return await ProductJourneyTemplate.create(data);
  }

  async findAll() {
    return await ProductJourneyTemplate.findAll();
  }

  async findById(id) {
    return await ProductJourneyTemplate.findByPk(id);
  }

  async update(id, data) {
    const productJourneyTemplate = await ProductJourneyTemplate.findByPk(id);
    if (productJourneyTemplate) {
      return await productJourneyTemplate.update(data);
    }
    return null;
  }

  async delete(id) {
    const productJourneyTemplate = await ProductJourneyTemplate.findByPk(id);
    if (productJourneyTemplate) {
      await productJourneyTemplate.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new ProductJourneyTemplateRepository();
