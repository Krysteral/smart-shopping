const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

// Get all products with store-specific pricing
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    
    // Get unique products with prices from all stores
    const productsMap = new Map();
    
    stores.forEach(store => {
      store.inventory.forEach(item => {
        if (!productsMap.has(item.product)) {
          productsMap.set(item.product, {
            name: item.product,
            prices: []
          });
        }
        productsMap.get(item.product).prices.push({
          store: store.name,
          price: item.price
        });
      });
    });

    const products = Array.from(productsMap.values()).map(product => ({
      name: product.name,
      storePrices: product.prices,
      // Calculate average price for display in dropdown
      averagePrice: (product.prices.reduce((sum, p) => sum + p.price, 0) / product.prices.length).toFixed(2)
    }));

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
