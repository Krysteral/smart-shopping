require('dotenv').config();
const mongoose = require('mongoose');
const Store = require('../models/Store');
const Product = require('../models/Product');

const stores = [
  {
    name: "Walmart",
    address: "123 Main St",
    city: "Oxford",
    state: "MS",
    zip: "38655",
    inventory: []
  },
  {
    name: "Kroger",
    address: "456 Oak Ave",
    city: "Oxford",
    state: "MS",
    zip: "38655",
    inventory: []
  },
  {
    name: "Target",
    address: "789 Pine Rd",
    city: "Oxford",
    state: "MS",
    zip: "38655",
    inventory: []
  }
];

const productsData = [
  {
    name: "Milk (1 gallon)",
    prices: { Walmart: 3.99, Kroger: 3.79, Target: 4.29 }
  },
  {
    name: "Bread",
    prices: { Walmart: 2.49, Kroger: 2.29, Target: 2.69 }
  },
  {
    name: "Eggs (dozen)",
    prices: { Walmart: 3.29, Kroger: 2.99, Target: 3.49 }
  },
  {
    name: "Cheese (8 oz)",
    prices: { Walmart: 4.99, Kroger: 4.79, Target: 5.29 }
  },
  {
    name: "Chicken Breast (1 lb)",
    prices: { Walmart: 4.99, Kroger: 4.49, Target: 5.29 }
  },
  {
    name: "Bananas (1 lb)",
    prices: { Walmart: 0.59, Kroger: 0.49, Target: 0.69 }
  },
  {
    name: "Rice (5 lb)",
    prices: { Walmart: 5.99, Kroger: 6.49, Target: 5.79 }
  },
  {
    name: "Pasta (16 oz)",
    prices: { Walmart: 1.99, Kroger: 1.79, Target: 2.29 }
  },
  {
    name: "Ground Beef (1 lb)",
    prices: { Walmart: 4.99, Kroger: 4.79, Target: 5.29 }
  },
  {
    name: "Tomatoes (1 lb)",
    prices: { Walmart: 2.99, Kroger: 2.79, Target: 3.29 }
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    // Force clear existing data
    console.log('Clearing existing data...');
    await Store.deleteMany({});
    await Product.deleteMany({});

    // Create products
    console.log('Creating products...');
    const products = await Product.create(
      productsData.map(p => ({ name: p.name }))
    );

    // Create stores with inventory
    console.log('Creating stores with inventory...');
    const storePromises = stores.map(async store => {
      const inventory = products.map(product => {
        const productData = productsData.find(p => p.name === product.name);
        return {
          product: product.name,
          productId: product._id,
          price: productData.prices[store.name]
        };
      });

      return Store.create({
        ...store,
        inventory
      });
    });

    await Promise.all(storePromises);
    
    // Verify seeding
    const storeCount = await Store.countDocuments();
    const productCount = await Product.countDocuments();
    console.log(`Seeding completed. Created ${storeCount} stores and ${productCount} products.`);
    
    // Start the server
    require('../server');
  } catch (error) {
    console.error('Error during deployment:', error);
    process.exit(1);
  }
}

// Connect to MongoDB and seed
console.log('Connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  return seedDatabase();
})
.catch(error => {
  console.error('Deployment failed:', error);
  process.exit(1);
}); 