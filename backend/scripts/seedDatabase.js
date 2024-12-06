const mongoose = require('mongoose');
const Store = require('../models/Store');

const sampleStores = [
  {
    name: "Walmart",
    city: "Oxford",
    zip: "38655",
    inventory: [
      { product: "Milk (1 gallon)", price: 3.99, quantity: 1, totalPrice: 3.99 },
      { product: "Bread", price: 2.49, quantity: 1, totalPrice: 2.49 },
      { product: "Eggs (dozen)", price: 3.29, quantity: 1, totalPrice: 3.29 },
      { product: "Cheese (8 oz)", price: 4.99, quantity: 1, totalPrice: 4.99 },
      { product: "Chicken Breast (1 lb)", price: 7.99, quantity: 1, totalPrice: 7.99 },
      { product: "Bananas (1 lb)", price: 0.59, quantity: 1, totalPrice: 0.59 },
      { product: "Rice (5 lb)", price: 5.99, quantity: 1, totalPrice: 5.99 },
      { product: "Pasta (16 oz)", price: 1.99, quantity: 1, totalPrice: 1.99 },
      { product: "Ground Beef (1 lb)", price: 4.99, quantity: 1, totalPrice: 4.99 },
      { product: "Tomatoes (1 lb)", price: 2.99, quantity: 1, totalPrice: 2.99 }
    ]
  },
  {
    name: "Kroger",
    city: "Oxford",
    zip: "38655",
    inventory: [
      { product: "Milk (1 gallon)", price: 4.29, quantity: 1, totalPrice: 4.29 },
      { product: "Bread", price: 2.29, quantity: 1, totalPrice: 2.29 },
      { product: "Eggs (dozen)", price: 3.49, quantity: 1, totalPrice: 3.49 },
      { product: "Cheese (8 oz)", price: 4.79, quantity: 1, totalPrice: 4.79 },
      { product: "Chicken Breast (1 lb)", price: 8.49, quantity: 1, totalPrice: 8.49 },
      { product: "Bananas (1 lb)", price: 0.69, quantity: 1, totalPrice: 0.69 },
      { product: "Rice (5 lb)", price: 6.49, quantity: 1, totalPrice: 6.49 },
      { product: "Pasta (16 oz)", price: 2.29, quantity: 1, totalPrice: 2.29 },
      { product: "Ground Beef (1 lb)", price: 5.29, quantity: 1, totalPrice: 5.29 },
      { product: "Tomatoes (1 lb)", price: 3.29, quantity: 1, totalPrice: 3.29 }
    ]
  },
  {
    name: "Target",
    city: "Oxford",
    zip: "38655",
    inventory: [
      { product: "Milk (1 gallon)", price: 4.19, quantity: 1, totalPrice: 4.19 },
      { product: "Bread", price: 2.59, quantity: 1, totalPrice: 2.59 },
      { product: "Eggs (dozen)", price: 3.19, quantity: 1, totalPrice: 3.19 },
      { product: "Cheese (8 oz)", price: 5.29, quantity: 1, totalPrice: 5.29 },
      { product: "Chicken Breast (1 lb)", price: 8.29, quantity: 1, totalPrice: 8.29 },
      { product: "Bananas (1 lb)", price: 0.65, quantity: 1, totalPrice: 0.65 },
      { product: "Rice (5 lb)", price: 6.29, quantity: 1, totalPrice: 6.29 },
      { product: "Pasta (16 oz)", price: 2.19, quantity: 1, totalPrice: 2.19 },
      { product: "Ground Beef (1 lb)", price: 5.19, quantity: 1, totalPrice: 5.19 },
      { product: "Tomatoes (1 lb)", price: 3.19, quantity: 1, totalPrice: 3.19 }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/smart-shopping');

    // Clear existing data
    await Store.deleteMany({});

    // Insert new data
    await Store.insertMany(sampleStores);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 