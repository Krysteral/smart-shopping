require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Store = require('../models/Store');
const ShoppingList = require('../models/ShoppingList');
const seedProducts = require('../data/seedProducts.json');
const seedStores = require('../data/seedStores.json');
const seedShoppingLists = require('../data/seedShoppingLists.json');

const connectDB = require('../config/db');
connectDB();

const populateData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await Store.deleteMany();
    await ShoppingList.deleteMany();

    // Insert seed data
    const products = await Product.insertMany(seedProducts);
    const stores = seedStores.map((store) => ({
      ...store,
      inventory: store.inventory.map((item) => ({
        productId: mongoose.Types.ObjectId(item.productId),
        price: item.price
      }))
    }));
    await Store.insertMany(stores);

    const shoppingLists = seedShoppingLists.map((list) => ({
      ...list,
      items: list.items.map((item) => ({
        productId: mongoose.Types.ObjectId(item.productId),
        quantity: item.quantity
      }))
    }));
    await ShoppingList.insertMany(shoppingLists);

    console.log('Database populated successfully!');
    process.exit();
  } catch (error) {
    console.error('Error populating data:', error);
    process.exit(1);
  }
};

populateData();
