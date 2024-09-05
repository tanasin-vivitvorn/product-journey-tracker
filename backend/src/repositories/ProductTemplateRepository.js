const ProductTemplate = require('../models/productTemplate.model');

class ProductTemplateRepository {
  async create(data) {
    return await ProductTemplate.create(data);
  }

  async findAll() {
    return await ProductTemplate.findAll();
  }

  async findById(id) {
    return await ProductTemplate.findByPk(id);
  }

  async update(id, data) {
    const productTemplate = await ProductTemplate.findByPk(id);
    if (productTemplate) {
      return await productTemplate.update(data);
    }
    return null;
  }

  async delete(id) {
    const productTemplate = await ProductTemplate.findByPk(id);
    if (productTemplate) {
      await productTemplate.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new ProductTemplateRepository();
