import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'uploads'),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error', err);
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    try {
      // Handle text inputs
      console.log('Fields:', fields);

      // Handle file uploads
      for (const key in files) {
        const file = files[key];
        const data = fs.readFileSync(file.path);
        fs.writeFileSync(`./uploads/${file.name}`, data);
        fs.unlinkSync(file.path);
        console.log(`Uploaded file: ${file.name}`);
      }

      // Here you would typically save the data to a database
      // For example: await saveToDatabase(fields, files);

      res.status(200).json({ message: 'Form data received successfully' });
    } catch (error) {
      console.error('Error processing form data:', error);
      res.status(500).json({ error: 'Error processing form data' });
    }
  });
}