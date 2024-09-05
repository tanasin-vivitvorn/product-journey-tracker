const journeyFormData = {
    '101': [
      {
        id: '1',
        element: 'TextInput',
        text: 'Product Name',
        required: true,
        canHaveAnswer: true,
        field_name: 'product_name',
      },
      // Add more form data as needed
    ],
    // Add more journey form data as needed
  };
  
  export default function handler(req, res) {
    const { journeyId } = req.query;
    res.status(200).json(journeyFormData[journeyId] || []);
  }
  