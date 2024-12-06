require('dotenv').config();
const mongoose = require('mongoose');
const Store = require('./models/Store');
const connectDB = require('./config/db');

const populateStores = async () => {
  await connectDB(); // Connect to MongoDB

  const stores = [
    {
      name: 'Store A',
      address: '123 Main Street',
      location: {
        type: 'Point',
        coordinates: [-90.123, 34.567] // Longitude, Latitude
      },
      inventory: [
        { productId: new mongoose.Types.ObjectId('64d2f7a78cce3a124a4b'), price: 2.99 },
        { productId: new mongoose.Types.ObjectId('64d2f7a78cce3a124a4c'), price: 1.25 }
      ]
    },
    {
      name: 'Store B',
      address: '456 Another St',
      location: {
        type: 'Point',
        coordinates: [-90.456, 34.890]
      },
      inventory: [
        { productId: new mongoose.Types.ObjectId('64d2f7a78cce3a124a4d'), price: 3.49 },
        { productId: new mongoose.Types.ObjectId('64d2f7a78cce3a124a4e'), price: 0.99 }
      ]
    }
  ];

  try {
    await Store.deleteMany(); // Clear existing stores
    await Store.insertMany(stores); // Populate stores
    console.log('Stores populated successfully!');
  } catch (error) {
    console.error('Error populating stores:', error);
  } finally {
    mongoose.connection.close(); // Close connection
  }
};

populateStores();
