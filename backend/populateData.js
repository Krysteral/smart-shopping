require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Store = require('./models/Store');

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();


const seedData = async () => {
  try {
    const products = await Product.insertMany([
      { name: 'Milk', category: 'Dairy', price: 2.5 },
      { name: 'Bread', category: 'Bakery', price: 1.5 },
      { name: 'Eggs', category: 'Dairy', price: 3.0 }
    ]);

    const stores = await Store.create({
      name: 'Nearby Supermarket',
      location: {
        type: 'Point',
        coordinates: [-89.5307, 34.3655]
      },
      inventory: [
        { productId: products[0]._id, price: 2.8 },
        { productId: products[1]._id, price: 1.6 },
        { productId: products[2]._id, price: 3.2 }
      ]
    });

    console.log('Database seeded!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
