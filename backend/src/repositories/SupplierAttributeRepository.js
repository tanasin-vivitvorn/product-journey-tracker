const SupplierAttribute = require('../models/supplierAttribute.model');

class SupplierAttributeRepository {
  async create(data) {
    return await SupplierAttribute.create(data);
  }

  async bulkCreate(attributes) {
    return await SupplierAttribute.bulkCreate(attributes);
  }

  async findAll() {
    return await SupplierAttribute.findAll();
  }

  async findById(id) {
    return await SupplierAttribute.findByPk(id);
  }

  async update(id, data) {
    const attribute = await SupplierAttribute.findByPk(id);
    if (attribute) {
      return await attribute.update(data);
    }
    return null;
  }

  async delete(id) {
    const attribute = await SupplierAttribute.findByPk(id);
    if (attribute) {
      await attribute.destroy();
      return true;
    }
    return false;
  }

  async deleteBySupplierID(supplierId) {
    const attributes = await SupplierAttribute.findAll({
      where: { SupplierID: supplierId } 
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
      console.log(`Cannot delete some record on supplier ${supplierId}`);
      return false;
    }
  }
}

const createSupplierAttribute = () => {
  
}

module.exports = new SupplierAttributeRepository();
