export default function handler(req, res) {
    const { id } = req.query;
  
    if (req.method === 'PUT') {
      const { name } = req.body;
  
      // Simulate updating the product type
      const productType = productTypes.find((type) => type.ProductTypeID === id);
      if (productType) {
        productType.ProductTypeName = name;
        res.status(200).json({ message: 'Product type updated successfully!' });
      } else {
        res.status(404).json({ message: 'Product type not found' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }