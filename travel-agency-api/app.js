// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const packageRoutes = require('./routes/packageRoutes'); // routes separated for cleanliness

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/packages', packageRoutes);

// You can add more route groups like: app.use('/api/users', userRoutes)

module.exports = app;
