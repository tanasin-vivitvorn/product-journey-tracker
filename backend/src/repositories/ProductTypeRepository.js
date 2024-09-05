const { Op } = require('sequelize');
const { ProductJourney, ProductJourneyTemplate, ProductTemplate, ProductType } = require('../models/');

class ProductTypeRepository {
  async create(data) {
    return await ProductType.create(data);
  }

  async findAll() {
    return await ProductType.findAll();
  }

  async findById(id) {
    return await ProductType.findAll({
      where: { ProductTypeID: id },
      include: [
        {
          model: ProductTemplate,
          as: 'ProductTemplates',
          required: false,
        },
        {
          model: ProductJourney,
          as: 'ProductJourneys',
          required: false,
          include: [
            {
              model: ProductJourneyTemplate,
              as: 'ProductJourneyTemplates',
              required: false,
            }
          ]
        }
      ],
    });
  }

  async update(id, data) {
    const productType = await ProductType.findByPk(id);
    if (productType) {
      return await productType.update(data);
    }
    return null;
  }

  async delete(id) {
    const productType = await ProductType.findByPk(id);
    if (productType) {
      await productType.destroy();
      return true;
    }
    return false;
  }

  async searchProductTypes({ searchQuery, page = 1, pageSize = 10 }) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const whereClause = {
      [Op.or]: [
        { ProductTypeName: { [Op.like]: `%${searchQuery}%` } },
      ]
    };

    const { rows, count } = await ProductType.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ProductTemplate,
          as: 'ProductTemplates',
          required: false,
        }
      ],
      offset,
      limit,
      distinct: true,
    });

    return {
      data: rows,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
      totalItems: count
    };
  }
}

module.exports = new ProductTypeRepository();
