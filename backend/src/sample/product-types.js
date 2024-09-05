export default function handler(req, res) {
    res.status(200).json([
      { ProductTypeID: '1', ProductTypeName: 'Electronics' },
      { ProductTypeID: '2', ProductTypeName: 'Furniture' },
      { ProductTypeID: '3', ProductTypeName: 'Clothing' },
    ]);
  }
  