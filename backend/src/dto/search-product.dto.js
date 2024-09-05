class SearchProductDTO {
    constructor(data) {
      this.query = {
        product_name: data.product_name,
        product_type: data.product_type,
        from_create: data.from_create,
        to_create: data.to_create,
      };
      this.pagination = {
        offset: (data.page - 1) * data.limit,
        limit: data.limit || 10,
      };
    }
  
    validate() {
      if (this.pagination.limit < 1) {
        throw new Error('Limit must be greater than 0');
      }
    }
  }
  
  module.exports = SearchProductDTO;
  