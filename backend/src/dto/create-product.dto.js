class CreateProductDTO {
  constructor(data) {
    this.product = {
      ProductName: data.ProductName,
      Images: data.images,
      ProductTypeID: data.ProductTypeID,
      SupplierID: data.SupplierID,
      CreateBy: data.CreateBy || 1,
    };
    this.attributes = data.attributes || [];
    this.answer = data.answer || [];
    this.journeys = data.journeys || [];
  }

  validate() {
    if (!this.product.ProductName || !this.product.ProductTypeID || !this.product.SupplierID) {
      throw new Error(`ProductName ${this.product.ProductName}, ProductType ${this.product.ProductTypeID}, and Supplier ${this.product.SupplierID} are required`);
    }
  }
}

class EditProductDTO extends CreateProductDTO {
  constructor(data) {
    super(data);
    this.product = {
      ...this.product,
      ProductID: data.ProductID,
    }
  }
  
  validate() {
    if (!this.product.ProductID || !this.product.ProductName || !this.product.ProductTypeID || !this.product.SupplierID) {
      throw new Error(`ProductID ${this.product.ProductID}, ProductName ${this.product.ProductName}, ProductType ${this.product.ProductTypeID}, and Supplier ${this.product.SupplierID} are required`);
    }
  }
}

module.exports = { CreateProductDTO, EditProductDTO };
  