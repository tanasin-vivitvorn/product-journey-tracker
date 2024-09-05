const predefinedJourneyElements = [
    {
      id: "1234",
      element: "Header",
      text: "Predefined Journey Form",
      static: true,
      required: false,
      bold: false,
      italic: false,
      content: "Predefined Journey Form"
    },
    {
      id: "5678",
      element: "TextInput",
      text: "Journey Name",
      required: true,
      canHaveAnswer: true,
      field_name: "journey_name_input"
    },
    {
      id: "9101",
      element: "TextArea",
      text: "Journey Details",
      required: false,
      canHaveAnswer: true,
      field_name: "journey_details_area"
    },
    {
      id: "1121",
      element: "Dropdown",
      text: "Status",
      required: true,
      canHaveAnswer: true,
      field_name: "status_dropdown",
      options: [
        {
          value: "in_progress",
          text: "In Progress"
        },
        {
          value: "completed",
          text: "Completed"
        }
      ]
    }
  ];
  
  export default function handler(req, res) {
    res.status(200).json(predefinedJourneyElements);
  }
  