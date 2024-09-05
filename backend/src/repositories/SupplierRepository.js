const { Supplier, SupplierAttribute} = require('../models');

class SupplierRepository {
  async create(data) {
    return await Supplier.create(data);
  }

  async findAll() {
    return await Supplier.findAll({
      where: { IsVisible: true },
    });
  }

  async findById(id) {
    return await Supplier.findByPk(id, {
      include: [
        SupplierAttribute, 
      ]
    });
  }

  async update(data) {
    const supplier = await Supplier.findByPk(data.SupplierID);
    if (supplier) {
      return await supplier.update(data);
    }
    return null;
  }

  async delete(id) {
    const supplier = await Supplier.findByPk(id);
    if (supplier) {
      supplier.IsVisible = false;
      await supplier.save();
      return supplier;
    }
    return null;
  }
}

module.exports = new SupplierRepository();
