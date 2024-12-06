const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

router.post('/compare-prices', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { products } = req.body;
    
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Invalid products data' });
    }

    const stores = await Store.find();
    console.log('Found stores:', stores.length);
    
    // Calculate per-store totals
    const storeTotals = stores.map(store => {
      let total = 0;
      const items = products.map(product => {
        const inventoryItem = store.inventory.find(item => item.product === product.name);
        const itemTotal = inventoryItem ? inventoryItem.price * product.quantity : 0;
        total += itemTotal;
        return {
          name: product.name,
          quantity: product.quantity,
          price: inventoryItem ? inventoryItem.price : null,
          total: itemTotal
        };
      });

      return {
        storeName: store.name,
        total: total,
        items: items
      };
    });

    // Find cheapest store for total bill
    const cheapestStore = storeTotals.reduce((min, store) => 
      store.total < min.total ? store : min
    );

    // Calculate optimal distribution across stores
    const optimalDistribution = products.map(product => {
      const pricesByStore = stores.map(store => {
        const inventoryItem = store.inventory.find(item => item.product === product.name);
        return {
          storeName: store.name,
          price: inventoryItem ? inventoryItem.price : null,
          totalPrice: inventoryItem ? inventoryItem.price * product.quantity : null
        };
      }).filter(store => store.price !== null);

      // Find cheapest store for this product
      const cheapestPrice = Math.min(...pricesByStore.map(store => store.price));
      const cheapestStore = pricesByStore.find(store => store.price === cheapestPrice);

      return {
        productName: product.name,
        quantity: product.quantity,
        cheapestAt: cheapestStore.storeName,
        price: cheapestStore.price,
        totalPrice: cheapestStore.totalPrice
      };
    });

    const response = {
      cheapestTotalBill: {
        store: cheapestStore.storeName,
        total: cheapestStore.total.toFixed(2),
        items: cheapestStore.items
      },
      optimalDistribution: {
        items: optimalDistribution,
        totalSavings: (cheapestStore.total - optimalDistribution.reduce((sum, item) => sum + item.totalPrice, 0)).toFixed(2)
      }
    };

    console.log('Sending response:', response);
    res.json(response);
  } catch (error) {
    console.error('Price comparison error:', error);
    res.status(500).json({ message: 'Error comparing prices', error: error.message });
  }
});

module.exports = router; 