const predefinedSupplierElements = [
    {
      id: "2001",
      element: "Header",
      text: "Supplier Information Form",
      static: true,
      required: false,
      bold: false,
      italic: false,
      content: "Supplier Information Form"
    },
    {
      id: "2002",
      element: "TextInput",
      text: "Supplier Name",
      required: true,
      canHaveAnswer: true,
      field_name: "supplier_name_input"
    },
    {
      id: "2003",
      element: "TextInput",
      text: "Contact Email",
      required: true,
      canHaveAnswer: true,
      field_name: "contact_email_input"
    },
    {
      id: "2004",
      element: "TextArea",
      text: "Address",
      required: false,
      canHaveAnswer: true,
      field_name: "address_area"
    },
    {
      id: "2005",
      element: "Dropdown",
      text: "Supplier Type",
      required: true,
      canHaveAnswer: true,
      field_name: "supplier_type_dropdown",
      options: [
        {
          value: "local",
          text: "Local"
        },
        {
          value: "international",
          text: "International"
        }
      ]
    }
  ];
  
  export default function handler(req, res) {
    res.status(200).json(predefinedSupplierElements);
  }
  