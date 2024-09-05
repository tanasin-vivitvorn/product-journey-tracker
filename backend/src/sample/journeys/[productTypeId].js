export default function handler(req, res) {
    const { productTypeId } = req.query;
  
    // For demonstration, return some mock journeys for any productTypeId
    const journeys = [
      { JourneyID: '101',
        JourneyName: 'Manufacturing' ,
        element: [
        {
          id: "text_input_1",
          element: "TextInput",
          text: "Name",
          required: true,
          canHaveAnswer: true,
          field_name: "name_input"
        },
        {
          id: "text_input_2",
          element: "TextInput",
          text: "Age",
          required: true,
          canHaveAnswer: true,
          field_name: "age_input"
        },
        {
          id: "text_input_3",
          element: "TextInput",
          text: "City",
          required: true,
          canHaveAnswer: true,
          field_name: "city_input"
        },
        {
          id: "journey_camera_input_1",
          read_only: true,
          element: "Camera",
          text: "Please take a photo:",
          field_name: "journey_camera_input_1"
        }
      ],},
      { JourneyID: '102', 
        JourneyName: 'Packaging', 
        element: [
        {
          id: "text_input_1",
          element: "TextInput",
          text: "Name",
          required: true,
          canHaveAnswer: true,
          field_name: "name_input"
        },
        {
          id: "text_input_2",
          element: "TextInput",
          text: "Age",
          required: true,
          canHaveAnswer: true,
          field_name: "age_input"
        },
        {
          id: "text_input_3",
          element: "TextInput",
          text: "City",
          required: true,
          canHaveAnswer: true,
          field_name: "city_input"
        },
        {
          id: "text_input_4",
          element: "TextInput",
          text: "Profession",
          required: true,
          canHaveAnswer: true,
          field_name: "profession_input"
        },
        {
          id: "text_input_5",
          element: "TextInput",
          text: "Pronoun",
          required: true,
          canHaveAnswer: true,
          field_name: "pronoun_input"
        },
        {
          id: "text_input_6",
          element: "TextInput",
          text: "Experience",
          required: true,
          canHaveAnswer: true,
          field_name: "experience_input"
        },
        {
          id: "text_input_7",
          element: "TextInput",
          text: "Possessive",
          required: true,
          canHaveAnswer: true,
          field_name: "possessive_input"
        },
        {
          id: "text_input_8",
          element: "TextInput",
          text: "Hobby",
          required: true,
          canHaveAnswer: true,
          field_name: "hobby_input"
        },
        {
          id: "journey_camera_input_1",
          read_only: true,
          element: "Camera",
          text: "Please take a photo:",
          field_name: "journey_camera_input_1"
        }
      ] },
      { JourneyID: '103', 
        JourneyName: 'Shipping',
        element: [
          {
            id: "text_input_1",
            element: "TextInput",
            text: "Name",
            required: true,
            canHaveAnswer: true,
            field_name: "name_input"
          },
          {
            id: "text_input_2",
            element: "TextInput",
            text: "Age",
            required: true,
            canHaveAnswer: true,
            field_name: "age_input"
          },
          {
            id: "text_input_3",
            element: "TextInput",
            text: "City",
            required: true,
            canHaveAnswer: true,
            field_name: "city_input"
          },
          {
            id: "text_input_4",
            element: "TextInput",
            text: "Profession",
            required: true,
            canHaveAnswer: true,
            field_name: "profession_input"
          },
          {
            id: "text_input_5",
            element: "TextInput",
            text: "Pronoun",
            required: true,
            canHaveAnswer: true,
            field_name: "pronoun_input"
          },
          {
            id: "text_input_6",
            element: "TextInput",
            text: "Experience",
            required: true,
            canHaveAnswer: true,
            field_name: "experience_input"
          },
          {
            id: "text_input_7",
            element: "TextInput",
            text: "Possessive",
            required: true,
            canHaveAnswer: true,
            field_name: "possessive_input"
          },
          {
            id: "text_input_8",
            element: "TextInput",
            text: "Hobby",
            required: true,
            canHaveAnswer: true,
            field_name: "hobby_input"
          },
          {
            id: "journey_camera_input_1",
            read_only: true,
            element: "Camera",
            text: "Please take a photo:",
            field_name: "journey_camera_input_1"
          }
        ]
       },
    ];
  
    res.status(200).json(journeys);
  }
  