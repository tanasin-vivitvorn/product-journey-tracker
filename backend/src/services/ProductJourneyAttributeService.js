const fs = require('fs');
const path = require('path');
const ProductJourneyAttributeRepository = require('../repositories/ProductJourneyAttributeRepository');

class ProductJourneyAttributeService {
  async createProductJourneyWithAttributes(data) {
    const templates = JSON.parse(data.FieldTemplate);
    const answer = JSON.parse(data.Answer);
    
    const attributes = templates.map(async (attr, index) => {
      console.log('attr:', attr);
      if (attr.element === 'Camera' || attr.element === 'FileUpload') {
        const productDir = path.join(__dirname, '..', '..', 'public', 'product', String(data.ProductID), 'journey', String(data.ProductJourneyID));
  
        if (!fs.existsSync(productDir)) {
          fs.mkdirSync(productDir, { recursive: true });
        }

        const fileName = `${Date.now()}_${answer[index].fileName}`;
        const filePath = path.join(productDir, fileName);
        const fileBuffer = Buffer.from(answer[index].value, 'base64');
        fs.writeFileSync(filePath, fileBuffer);
        answer[index].value = `/public/product/${data.ProductID}/journey/${data.ProductJourneyID}/${fileName}`;
      }

      return attr;
    });
    console.log('answer', answer);


    if (templates && templates instanceof Array) {
      const deleteByProductIdResult = await ProductJourneyAttributeRepository.deleteByProductID(data.ProductID);

      if (deleteByProductIdResult) {
        const attributes = templates.map((template, index) => ({
          ProductID: data.ProductID,
          ProductJourneyID: data.ProductJourneyID,
          FieldTemplate: template,
          Answer: answer[index],
          Name: template.label,
          Value: answer[index].value,
          CreateBy: data.CreateBy,
        }));
        console.log(attributes);
        await ProductJourneyAttributeRepository.bulkCreate(attributes);
      }
    }

    return { templates, answer };
  }

  async getAllProductJourneyAttributes() {
    return await ProductJourneyAttributeRepository.findAll();
  }

  async getProductJourneyAttributeById(id) {
    return await ProductJourneyAttributeRepository.findById(id);
  }

  async updateProductJourneyAttribute(id, data) {
    return await ProductJourneyAttributeRepository.update(id, data);
  }

  async deleteProductJourneyAttribute(id) {
    return await ProductJourneyAttributeRepository.delete(id);
  }
}

module.exports = new ProductJourneyAttributeService();
