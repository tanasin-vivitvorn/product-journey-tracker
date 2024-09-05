const SupplierRepository = require('../repositories/SupplierRepository');
const SupplierAttributeRepository = require('../repositories/SupplierAttributeRepository');

class SupplierService {
  async createSupplier(data) {
    const supplier = await SupplierRepository.create(data);
    data.SupplierID = supplier.SupplierID;
    await this.createSupplierAttribute(data);
    
    return supplier;
  }

  async updateSupplier(data) {
    const supplier = await SupplierRepository.update(data);

    if (!supplier) return null;

    if(SupplierAttributeRepository.deleteBySupplierID(data.SupplierID)) {
      await this.createSupplierAttribute(data);
    }

    return supplier;
  }

  async getAllSuppliers() {
    return await SupplierRepository.findAll();
  }

  async getSupplierById(id) {
    const Supplier =  await SupplierRepository.findById(id);
    const SupplierAttributes = Supplier.SupplierAttributes;
    const FieldTemplate = [];
    const answer = {};

    await SupplierAttributes.map((e) => {
      FieldTemplate.push(e.FieldTemplate);
      if (e.Answer.name) {
        answer[e.Answer.name] = e.Answer.value;
      }
    });

    const result = {
      SupplierID: Supplier.SupplierID,
      SupplierName: Supplier.SupplierName,
      CreateAt: Supplier.CreateAt,
      CreateBy: Supplier.CreateBy,
      UpdateAt: Supplier.UpdateAt,
      UpdateBy: Supplier.UpdateBy,
      FieldTemplate,
      answer
    }
    return result;
  }

  async deleteSupplier(id) {
    return await SupplierRepository.delete(id);
  }

  createSupplierAttribute = async(data) => {
    const Attributes = JSON.parse(data.Attributes);
    const Answer = JSON.parse(data.Answer);
    if (Attributes && Attributes instanceof Array) {
      let skip = 0;
      const attributes = Attributes.map((attr, index) => {
        let answer = Answer[index - skip];
        let name = attr.label;
        let value = Answer[index - skip]?.value;
        if (!attr.label) {
          skip++;
          answer = {};
          name = attr.field_name;
          value = '';
        }
        return{
          SupplierID: data.SupplierID,
          FieldTemplate: attr,
          Answer: answer,
          Name: name,
          Value: value,
          CreateBy: data.CreateBy,
        }
      });
      console.log(attributes);
      await SupplierAttributeRepository.bulkCreate(attributes);
    }
  }
}

module.exports = new SupplierService();
