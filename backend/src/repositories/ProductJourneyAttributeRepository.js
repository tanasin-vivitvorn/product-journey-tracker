const { ProductJourneyAttribute } = require('../models');

class ProductJourneyAttributeRepository {
  async create(data) {
    return await ProductJourneyAttribute.create(data);
  }

  async bulkCreate(attributes) {
    return await ProductJourneyAttribute.bulkCreate(attributes);
  }

  async findAll() {
    return await ProductJourneyAttribute.findAll({
      where: { IsVisible: true },
    });
  }

  async findById(id) {
    return await ProductJourneyAttribute.findByPk(id);
  }

  async update(id, data) {
    const attribute = await ProductJourneyAttribute.findByPk(id);
    if (attribute) {
      return await attribute.update(data);
    }
    return null;
  }

  async delete(id) {
    const attribute = await ProductJourneyAttribute.findByPk(id);
    if (attribute) {
      attribute.IsVisible = false;
      await attribute.save();
      return attribute;
    }
    return null;
  }

  async deleteByProductID(productID) {
    const attributes = await ProductJourneyAttribute.findAll({
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

module.exports = new ProductJourneyAttributeRepository();
