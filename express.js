  import express from 'express';
  import cors from 'cors';

  const app = express();
  const PORT = 5000;

  let users = [];
  let students = [];
  let admins = [];
  let nextUserId = 1;
  let nextStudentId = 1;
  let nextAdminId = 1;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.post('/admins', (req, res) => {
    const newAdmin = { id: nextAdminId++, ...req.body };
    admins.push(newAdmin);
    console.log('New admin added:', newAdmin);
    res.status(201).json({ message: 'Admin added successfully!', data: newAdmin });
  });

  app.post('/students', (req, res) => {
    const newStudent = { id: nextStudentId++, ...req.body };
    students.push(newStudent);
    console.log('New student added:', newStudent);
    res.status(201).json({ message: 'Student added successfully!', data: newStudent });
  });

  app.post('/users', (req, res) => {
    const newUser = { id: nextUserId++, ...req.body };
    users.push(newUser);
    console.log('New user added:', newUser);
    res.status(201).json({ message: 'User added successfully!', data: newUser });
  });

  app.get('/admins', (req, res) => {
    res.status(200).json(admins);
  });

  app.get('/students', (req, res) => {
    res.status(200).json(students);
  });

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
      students[studentIndex] = { ...students[studentIndex], ...req.body };
      res.status(200).json({ message: 'Student updated successfully!', data: students[studentIndex] });
    } else {
      res.status(404).json({ message: 'Student not found.' });
    }
  });

  app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const initialLength = students.length;
    students = students.filter(s => s.id !== studentId);
    if (students.length < initialLength) {
      res.status(200).json({ message: 'Student deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Student not found.' });
    }
  });

  app.use((req, res) => {
    res.status(404).send('API endpoint not found.');
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });