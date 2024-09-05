const fs = require('fs');
const path = require('path');
const ProductRepository = require('../repositories/ProductRepository');
const ProductAttributeRepository = require('../repositories/ProductAttributeRepository');

class ProductService {
  createProductWithAttributes = async (data) => {
  const product = await ProductRepository.create(data.product);
    data.Images = data.product.Images;
    data.product = product;
    await this.saveProductImages(data);
    await this.createProductAttribute(data);
    return product;
  }

  editProduct = async (data) => {
    const product = await ProductRepository.update(data.product);

    if (!product) return null;

    if(ProductAttributeRepository.deleteByProductID(product.ProductID)) {
      await this.createProductAttribute(data);
    }

    return product;
  }

  getProductById = async (productID) => {
    const product = await ProductRepository.findById(productID);
    const predefinedElements = [];
    const predefinedElementsAnswer = {};
    product?.ProductAttributes.map((e) => {
      predefinedElements.push(e.FieldTemplate);
      predefinedElementsAnswer[e.FieldTemplate.field_name] = e.Value;
    })
    
    const groupedData = product?.ProductJourneyAttributes.reduce((result, current) => {
      const { ProductJourneyID, Answer } = current;
  
      // Initialize the journey if it doesn't exist
      if (!result.journeys[ProductJourneyID]) {
          result.journeys[ProductJourneyID] = {
              ProductJourneyID,
              elements: []
          };
      }
  
      // Push the answer to the appropriate journey
      result.journeys[ProductJourneyID].elements.push(Answer);
  
      return result;
  }, {
      ProductID: productID,
      journeys: {}
  });

    const predefinedJourneyElements  = [];
    product.ProductType.ProductJourneys.map((e,index) => {
      predefinedJourneyElements.push(
        {
          ProductJourneyID: e.ProductJourneyID,
          ProductJourneyName: e.ProductJourneyName,
          ProductJourneyIndex: e.ProductJourneyIndex,
          createAt: e.CreateAt,
          messageTemplate: e.DefaultMessageTemplate,
          ProductJourneyTemplates: e.ProductJourneyTemplates[0].FieldTemplate,
          answer:groupedData.journeys[e.ProductJourneyID]?.elements
        }
      );
    });

    const result = { 
      product: {
        productName: product?.ProductName, 
        productType: product?.ProductType
      },
      supplier: product?.Supplier,
      predefinedElements,
      predefinedElementsAnswer,
      predefinedJourneyElements,
      ProductJourneys: predefinedJourneyElements,
      groupedData
    };
    return result;
  }

  // Get all visible Products
  getAllVisibleProducts = async () => {
    return await ProductRepository.findAllVisible();
  }

  // Soft delete a Product by updating the IsVisible flag to false
  softDeleteProduct = async (id) =>  {
    return await ProductRepository.softDelete(id);
  }

  saveProductImages = async (data) => {
    const productDir = path.join(__dirname, '..', '..', 'public', 'product', String(data.product.ProductID), 'main');
    if (!fs.existsSync(productDir)) {
      fs.mkdirSync(productDir, { recursive: true });
    }

    console.log(data?.Images);
    data?.Images.map((e, index) => {
      const fileName = `${index}.png`;
      const filePath = path.join(productDir, fileName);
      const fileBuffer = Buffer.from(e, 'base64');
      fs.writeFileSync(filePath, fileBuffer);
    });
  }

  countProductImages = async (product) => {
    const productDir = path.join(__dirname, '..', '..', 'public', 'product', String(product.ProductID), 'main');
    
    try {
        const files = await fs.readdir(productDir);
        const pngFiles = files.filter(file => file.endsWith('.png'));
        return pngFiles.length;
    } catch (error) {
        console.error('Error reading directory:', error);
        return 0; // Return 0 if there's an error, such as the directory not existing
    }
  };

  createProductAttribute = async (data) => {
    const product = data.product;
  
    if (data.attributes && Array.isArray(data.attributes)) {
      const attributes = data.attributes.map(async (attr, index) => {
        let fileUrl = '';
  
        if (attr.element === 'Camera' || attr.element === 'FileUpload') {
          const productDir = path.join(__dirname, '..', '..', 'public', 'product', String(product.ProductID));
          if (!fs.existsSync(productDir)) {
            fs.mkdirSync(productDir, { recursive: true });
          }
          const fileName = `${Date.now()}_${data.answer[index].fileName}`;
          const filePath = path.join(productDir, fileName);
          const fileBuffer = Buffer.from(data.answer[index].value, 'base64');
          fs.writeFileSync(filePath, fileBuffer);
  
          // Construct the file URL
          fileUrl = `/public/product/${product.ProductID}/${fileName}`;
  
          // Update the data.answer[index] with the file URL
          data.answer[index].value = fileUrl;
        }
  
        return {
          ProductID: product.ProductID,
          FieldTemplate: attr,
          Answer: data.answer[index],
          Name: attr.label,
          Value: data.answer[index].value,
          CreateBy: product.CreateBy
        };
      });
  
      for (const attribute of attributes) {
        await ProductAttributeRepository.create(await attribute);
      }
    }
  }
}

module.exports = new ProductService();
