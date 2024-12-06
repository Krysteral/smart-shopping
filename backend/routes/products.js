const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

// GET all unique products from stores
router.get('/products', async (req, res) => {
  try {
    const stores = await Store.find();
    
    // Extract unique products from all stores' inventories
    const uniqueProducts = new Set();
    stores.forEach(store => {
      store.inventory.forEach(item => {
        uniqueProducts.add(JSON.stringify({
          id: item._id,
          name: item.product,
          price: item.price
        }));
      });
    });

    // Convert Set back to array and parse JSON strings
    const products = Array.from(uniqueProducts).map(item => JSON.parse(item));
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Optional: Add a new product to store inventory
router.post('/products', async (req, res) => {
  try {
    const { storeName, product, price } = req.body;
    
    const store = await Store.findOne({ name: storeName });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    store.inventory.push({ product, price });
    await store.save();
    
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

module.exports = router; 