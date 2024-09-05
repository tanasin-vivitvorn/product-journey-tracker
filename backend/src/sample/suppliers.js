const suppliers = [
    {
      id: 1,
      name: 'Supplier 1',
      createdAt: '2023-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'Supplier 2',
      createdAt: '2023-02-01T00:00:00Z',
    },
    // Add more suppliers as needed
  ];
  
  export default function handler(req, res) {
    const { supplierName, fromDate, toDate, page, limit, sortKey, sortDirection } = req.query;
  
    let filteredSuppliers = suppliers;
  
    if (supplierName) {
      filteredSuppliers = filteredSuppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(supplierName.toLowerCase())
      );
    }
  
    if (fromDate) {
      filteredSuppliers = filteredSuppliers.filter((supplier) => new Date(supplier.createdAt) >= new Date(fromDate));
    }
  
    if (toDate) {
      filteredSuppliers = filteredSuppliers.filter((supplier) => new Date(supplier.createdAt) <= new Date(toDate));
    }
  
    if (sortKey) {
      filteredSuppliers.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    const startIndex = (page - 1) * limit;
    const paginatedSuppliers = filteredSuppliers.slice(startIndex, startIndex + parseInt(limit));
  
    res.status(200).json({
      suppliers: paginatedSuppliers,
      totalItems: filteredSuppliers.length,
    });
  }
  