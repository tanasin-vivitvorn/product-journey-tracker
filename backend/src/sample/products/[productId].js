const predefinedElements = [
  {
    id: "text_input_1",
    element: "TextInput",
    text: "Name",
    required: true,
    canHaveAnswer: true,
    field_name: "name_input"
  },
  {
    id: "file_upload_1",
    read_only: true,
    element: "FileUpload",
    text: "Please upload your file:",
    field_name: "file_upload_1"
  },
  {
    id: "camera_input_1",
    read_only: true,
    element: "Camera",
    text: "Please take a photo:",
    field_name: "camera_input_1"
  },
  {
    id: "camera_input_2",
    read_only: true,
    element: "Camera",
    text: "Please take a photo:",
    field_name: "camera_input_2"
  }
];

const predefinedElementsAnswer = {
  name_input: "Jane Smith",
  file_upload_1:  "https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4",
  camera_input_1: "http://localhost:3000/images/1.jpeg",
  camera_input_2: "http://localhost:3000/images/2.webp"
};

const predefinedJourneyElements  = [
  {
    stepName: 'Manufacture',
    sequence: 1,
    processDate: "2024-01-01 12:30:00",
    messageTemplate: "{{object_name}} is a pile of {{description}} against a {{background_color}} background. These {{material_type}} pellets or nuggets, possibly made from {{material_source}}, could be melted down and refined for use in creating items like the {{item_name}} mentioned earlier. The contrast between the {{color_contrast}} and the {{background_color}} background highlights the {{quality}} and {{purity}} of the metal",
    element: [
      {
        id: "text_input_1",
        element: "TextInput",
        text: "Name",
        required: true,
        canHaveAnswer: true,
        field_name: "object_name"
      },
      {
        id: "text_input_2",
        element: "TextInput",
        text: "Age",
        required: true,
        canHaveAnswer: true,
        field_name: "description"
      },
      {
        id: "text_input_3",
        element: "TextInput",
        text: "City",
        required: true,
        canHaveAnswer: true,
        field_name: "background_color"
      },
      {
        id: "text_input_4",
        element: "TextInput",
        text: "City",
        required: true,
        canHaveAnswer: true,
        field_name: "material_type"
      },
      {
        id: "text_input_5",
        element: "TextInput",
        text: "City",
        required: true,
        canHaveAnswer: true,
        field_name: "material_source"
      },
      {
        id: "text_input_6",
        element: "TextInput",
        text: "City",
        required: true,
        canHaveAnswer: true,
        field_name: "item_name"
      },
      {
        id: "text_input_7",
        element: "TextInput",
        text: "City",
        required: true,
        canHaveAnswer: true,
        field_name: "color_contrast"
      },
      {
        id: "text_input_8",
        element: "TextInput",
        text: "City",
        required: true,
        canHaveAnswer: true,
        field_name: "quality"
      },
      {
        id: "text_input_9",
        element: "TextInput",
        text: "City",
        required: true,
        canHaveAnswer: true,
        field_name: "purity"
      },
      {
        id: "journey_camera_input_1",
        read_only: true,
        element: "Camera",
        text: "Please take a photo:",
        field_name: "journey_camera_input_1"
      },
    ],
    answer: {
      "object_name": "silver pellets",
      "description": "small, shiny silver",
      "background_color": "deep blue",
      "material_type": "silver",
      "material_source": "high-grade scrap silver alloy",
      "item_name": "silver alloy locket",
      "color_contrast": "bright silver",
      "quality": "quality",
      "purity": "100% purity",
      journey_camera_input_1: "http://localhost:3000/images/3.jpg"
    }
  },{
    stepName: 'Packaging',
    sequence: 2,
    processDate: "2024-01-02 08:30:15",
    messageTemplate: "{{name_input}} with an intricate floral design, created from {{age_input}}% high-grade scrap silver alloy. The locket rests on a dark surface, symbolizing tradition, craftsmanship, and personal significance.",
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
    ],
    answer: {
      name_input: "A heart-shaped locket",
      age_input: 80,
      city_input: "New York",
      profession_input: "software developer",
      pronoun_input: "She",
      experience_input: 5,
      possessive_input: "her",
      hobby_input: "painting",
      journey_camera_input_1: "http://localhost:3000/images/4.webp"
    }
  },{
    stepName: 'Shipping',
    sequence: 3,
    processDate: "2024-01-03 08:30:15",
    messageTemplate: "{{name_input}} is a {{profession_input}} living in {{city_input}}. {{pronoun_input}} has been working in this field for {{experience_input}} years. In {{possessive_input}} free time, {{name_input}} enjoys {{hobby_input}}.",
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
    ],
    answer: {
      name_input: "Jane Smith",
      age_input: 30,
      city_input: "New York",
      profession_input: "software developer",
      pronoun_input: "She",
      experience_input: 5,
      possessive_input: "her",
      hobby_input: "painting",
      journey_camera_input_1: "http://localhost:3000/images/5.png"
    }
  }
];

export default function handler(req, res) {
  const { typeId } = req.query;

  // For demonstration, we'll return the predefinedElements for any typeId
  res.status(200).json({productType: "Electronics", predefinedElements, predefinedElementsAnswer, predefinedJourneyElements});
}
