const products = [
    {
      id: 1,
      name: 'Product 1',
      type: 'Electronics',
      createdAt: '2023-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'Product 2',
      type: 'Furniture',
      createdAt: '2023-02-01T00:00:00Z',
    },
    // Add more products as needed
  ];
  
  export default function handler(req, res) {
    const { productName, productType, fromDate, toDate, page, limit, sortKey, sortDirection } = req.query;
  
    let filteredProducts = products;
  
    if (productName) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(productName.toLowerCase())
      );
    }
  
    if (productType) {
      filteredProducts = filteredProducts.filter((product) =>
        product.type.toLowerCase().includes(productType.toLowerCase())
      );
    }
  
    if (fromDate) {
      filteredProducts = filteredProducts.filter((product) => new Date(product.createdAt) >= new Date(fromDate));
    }
  
    if (toDate) {
      filteredProducts = filteredProducts.filter((product) => new Date(product.createdAt) <= new Date(toDate));
    }
  
    if (sortKey) {
      filteredProducts.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    const startIndex = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + parseInt(limit));
  
    res.status(200).json({
      products: paginatedProducts,
      totalItems: filteredProducts.length,
    });
  }
  