import express from 'express';
import cors from 'cors'; // Import the cors module
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(cors()); // Enables Cross-Origin Resource Sharing

// API Endpoints
// These endpoints will receive data from your Vue.js forms

app.post('/getAdmin', (req, res) => {
  const { firstName, lastName } = req.body;
  console.log('Received data from Admin form:', req.body);
  // In a real app, you would process this data, e.g., save it to a database
  res.status(200).json({ message: 'Admin data received successfully!', data: { firstName, lastName } });
});

app.post('/getStudent', (req, res) => {
  const { firstName, lastName, yearAndSection } = req.body;
  console.log('Received data from Student form:', req.body);
  res.status(200).json({ message: 'Student data received successfully!', data: { firstName, lastName, yearAndSection } });
});

app.post('/getUser', (req, res) => {
  const { firstName, lastName } = req.body;
  console.log('Received data from User form:', req.body);
  res.status(200).json({ message: 'User data received successfully!', data: { firstName, lastName } });
});

app.use((req, res) => {
  res.status(404).send('API endpoint not found.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});