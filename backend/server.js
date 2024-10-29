require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// API Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/stores', require('./routes/storeRoutes'));

// Server setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
