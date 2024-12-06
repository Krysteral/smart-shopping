require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Store = require('./models/Store');
const ShoppingList = require('./models/ShoppingList');

const connectDB = require('./config/db');
connectDB();

const populateData = async () => {
  try {
    // Add sample products, stores, and shopping lists
    await Product.deleteMany();
    await Store.deleteMany();
    await ShoppingList.deleteMany();

    const products = await Product.insertMany([
      { name: 'Apple', price: 1.2 },
      { name: 'Banana', price: 0.5 },
    ]);

    const stores = await Store.create({
      name: 'Walmart',
      address: '123 Main St',
      location: { type: 'Point', coordinates: [-90.1, 32.3] },
      inventory: [
        { productId: products[0]._id, price: 1.2 },
        { productId: products[1]._id, price: 0.6 },
      ],
    });

    console.log('Database populated!');
    process.exit();
  } catch (error) {
    console.error('Error populating data:', error);
    process.exit(1);
  }
};

populateData();
