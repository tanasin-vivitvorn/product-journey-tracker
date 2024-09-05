const { MessageTemplate, Product, ProductAttribute, ProductJourney, ProductJourneyAttribute, ProductJourneyTemplate, ProductType, Supplier, SupplierAttribute } = require('../models');

class ProductRepository {

  findById = async (productId) => {
    return Product.findByPk(productId, {
      include: [
        MessageTemplate, 
        ProductAttribute, 
        ProductJourneyAttribute, 
        {
          model: Supplier,
          include: [
            {
              separate: true,
              model: SupplierAttribute
            }
          ]
        },
        {
          model: ProductType,
          include: [
            {
              model: ProductJourney,
              include: [
                {
                  separate: true,
                  model: ProductJourneyTemplate
                }
              ]
            }
          ]
        }
      ]
    });
  }

  async create(data) {
    return await Product.create(data);
  }

  async findAllVisible() {
    return await Product.findAll({
      where: {
        IsVisible: true,
      }, 
      include: [
        {
          model: Supplier,
          include: [
            {
              separate: true,
              model: SupplierAttribute
            }
          ]
        },
        ProductType
      ]
    });
  }

  async softDelete(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    
    product.IsVisible = false;
    await product.save();
    return product;
  }

  update = async (productData, attributes, journeys) => {
    const productId = productData.ProductID;
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');
    
    await product.update(productData);

    if (attributes) {
      await ProductAttribute.destroy({ where: { ProductID: productId } });
      for (const attr of attributes) {
        await ProductAttribute.create({ ...attr, ProductID: productId });
      }
    }

    if (journeys) {
      await ProductJourneyAttribute.destroy({ where: { ProductID: productId } });
      for (const journey of journeys) {
        await ProductJourneyAttribute.create({ ...journey, ProductID: productId });
      }
    }

    return product;
  }

  search = (query, pagination) => {
    const whereClause = {
      IsVisible: true,
      ...(query.product_name && { ProductName: { [Sequelize.Op.like]: `%${query.product_name}%` } }),
      ...(query.product_type && { ProductType: query.product_type }),
      ...(query.from_create && { CreateAt: { [Sequelize.Op.gte]: query.from_create } }),
      ...(query.to_create && { CreateAt: { [Sequelize.Op.lte]: query.to_create } }),
    };

    return Product.findAndCountAll({
      where: whereClause,
      offset: pagination.offset,
      limit: pagination.limit,
    });
  }
}

module.exports = new ProductRepository();
