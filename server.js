const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const taskRoutes = require('./routes/routeTask');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', taskRoutes);

// Connecting to MongoDB 
mongoose.connect('mongodb://localhost:27017/todoDB')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
