const ProductAttributeRepository = require('../repositories/ProductAttributeRepository');

class ProductAttributeService {
  async createProductAttribute(data) {
    return await ProductAttributeRepository.create(data);
  }

  async createBulkProductAttribute(data) {
    return await ProductAttributeRepository.bulkCreate(data);
  }

  async getAllProductAttributes() {
    return await ProductAttributeRepository.findAll();
  }

  async getProductAttributeById(id) {
    return await ProductAttributeRepository.findById(id);
  }

  async updateProductAttribute(id, data) {
    return await ProductAttributeRepository.update(id, data);
  }

  async deleteProductAttribute(id) {
    return await ProductAttributeRepository.delete(id);
  }
}

module.exports = new ProductAttributeService();
