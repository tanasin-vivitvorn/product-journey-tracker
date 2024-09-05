const ProductJourneyRepository = require('../repositories/ProductJourneyRepository');

class ProductJourneyService {
  async createProductJourney(data) {
    return await ProductJourneyRepository.create(data);
  }

  async getAllProductJourneys() {
    return await ProductJourneyRepository.findAll();
  }

  async getProductJourneyById(id) {
    return await ProductJourneyRepository.findByProductTypeID(id);
  }

  async updateProductJourney(id, data) {
    return await ProductJourneyRepository.update(id, data);
  }

  async deleteProductJourney(id) {
    return await ProductJourneyRepository.delete(id);
  }
}

module.exports = new ProductJourneyService();
