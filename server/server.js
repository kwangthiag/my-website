require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const fs = require('fs');
const uploadsDir = path.join(__dirname, './uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for requests from frontend
app.use(cors({
  origin: 'http://localhost',  // Use env variable or localhost
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Use the blog routes
app.use('/api', blogRoutes);
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Optional: Catch-all route for `/api/`
app.get('/api/', (req, res) => {
  res.json({ message: 'API Root' });
});

// Sync the database and start the server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to sync the database:', error);
});
