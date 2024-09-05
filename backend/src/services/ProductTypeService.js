const ProductTypeRepository = require('../repositories/ProductTypeRepository');

class ProductTypeService {
  async createProductType(data) {
    return await ProductTypeRepository.create(data);
  }

  async getAllProductTypes() {
    return await ProductTypeRepository.findAll();
  }

  async getProductTypeById(id) {
    return await ProductTypeRepository.findById(id);
  }

  async updateProductType(id, data) {
    return await ProductTypeRepository.update(id, data);
  }

  async deleteProductType(id) {
    return await ProductTypeRepository.delete(id);
  }

  async searchProductTypes({ searchQuery, page, pageSize }) {
    return await ProductTypeRepository.searchProductTypes({ searchQuery, page, pageSize });
  }
}

module.exports = new ProductTypeService();
