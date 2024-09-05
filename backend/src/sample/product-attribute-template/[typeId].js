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
  }
];

export default function handler(req, res) {
  const { typeId } = req.query;

  // For demonstration, we'll return the predefinedElements for any typeId
  res.status(200).json({predefinedElements});
}
