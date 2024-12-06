require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Store = require('./models/Store');
const Product = require('./models/Product');

const app = express();

// Initial seed data
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
    const storeCount = await Store.countDocuments();
    if (storeCount === 0) {
      console.log('Seeding database...');
      
      // Clear existing data
      await Store.deleteMany({});
      await Product.deleteMany({});

      // Create products
      const products = await Product.create(
        productsData.map(p => ({ name: p.name }))
      );

      // Create stores with inventory
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
      console.log('Database seeded successfully');
    } else {
      console.log('Database already has data, skipping seed');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', async () => {
  console.log('Connected to MongoDB');
  await seedDatabase();
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api', priceRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Use PORT 10000 as default
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});