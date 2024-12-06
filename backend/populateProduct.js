const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

connectDB();

const products = [
  { name: "Apple", description: "Fresh red apples", category: "Fruits" },
  { name: "Banana", description: "Sweet ripe bananas", category: "Fruits" },
  { name: "Eggplant", description: "Fresh organic eggplants", category: "Vegetables" },
];

const populateProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products added successfully');
    process.exit();
  } catch (error) {
    console.error('Error populating products:', error);
    process.exit(1);
  }
};

populateProducts();
