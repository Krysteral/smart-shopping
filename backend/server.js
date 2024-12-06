require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/stores', require('./routes/storeRoutes'));
app.use('/api/shoppinglists', require('./routes/shoppingListRoutes')); // Example additional route

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Smart Shopping API');
});

// Catch-All Route for Undefined Endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Server Setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
