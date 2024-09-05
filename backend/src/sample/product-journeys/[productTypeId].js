export default function handler(req, res) {
    const { productTypeId } = req.query;
  
    // For demonstration, return some mock journeys for any productTypeId
    const journeys = [
      { id: '101', name: 'Manufacturing', description: 'Manufacturing', sortIndex: 1},
      { id: '102', name: 'Packaging', description: 'Packaging', sortIndex: 2 },
      { id: '103', name: 'Shipping', description: 'Shipping', sortIndex: 3 },
    ];
  
    res.status(200).json(journeys);
  }