const { ProductAttribute } = require('../models');

class ProductAttributeRepository {
  async create(data) {
    return await ProductAttribute.create(data);
  }

  async findAll() {
    return await ProductAttribute.findAll();
  }

  async findById(id) {
    return await ProductAttribute.findByPk(id);
  }

  async update(id, data) {
    const productAttribute = await ProductAttribute.findByPk(id);
    if (productAttribute) {
      return await productAttribute.update(data);
    }
    return null;
  }

  async delete(id) {
    const productAttribute = await ProductAttribute.findByPk(id);
    if (productAttribute) {
      await productAttribute.destroy();
      return true;
    }
    return false;
  }

  async bulkCreate(attributes) {
    return await ProductAttribute.bulkCreate(attributes);
  }

  async deleteByProductID(productID) {
    const attributes = await ProductAttribute.findAll({
      where: { ProductID: productID } 
    });

    let cnt = 0;
    if (attributes.length > 0) {
      for (let attr of attributes) {
        await attr.destroy();
        cnt++;
      }
    }

    if (attributes.length === cnt) {
      return true;
    } else {
      console.log(`Cannot delete some record on product ${productID}`);
      return false;
    }
  }
}

module.exports = new ProductAttributeRepository();
