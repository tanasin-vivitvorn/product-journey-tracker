const { ProductJourney, ProductJourneyTemplate } = require('../models/');

class ProductJourneyRepository {
  async create(data) {
    return await ProductJourney.create(data);
  }

  async findAll() {
    return await ProductJourney.findAll();
  }

  async findById(id) {
    return await ProductJourney.findByPk(id);
  }

  async findByProductTypeID(productTypeID) {
    return await ProductJourney.findAll({
      where: { ProductTypeID: productTypeID },
      order: [['ProductJourneyIndex', 'ASC']],
      include: [
        {
          model: ProductJourneyTemplate,
          as: 'ProductJourneyTemplates',
          required: false,
        }
      ],
    });
  }

  async update(id, data) {
    const productJourney = await ProductJourney.findByPk(id);
    if (productJourney) {
      return await productJourney.update(data);
    }
    return null;
  }

  async delete(id) {
    const productJourney = await ProductJourney.findByPk(id);
    if (productJourney) {
      await productJourney.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new ProductJourneyRepository();
