const express = require('express');
const Store = require('../models/Store');
const router = express.Router();

// GET all stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find().populate('products'); // Populate product details
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new store
router.post('/', async (req, res) => {
  const store = new Store(req.body);
  try {
    const newStore = await store.save();
    res.status(201).json(newStore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
