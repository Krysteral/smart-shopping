const express = require('express');
const Store = require('../models/Store');
const router = express.Router();

// GET all stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
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

// UPDATE a store by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.json(updatedStore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a store by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStore = await Store.findByIdAndDelete(req.params.id);
    if (!deletedStore) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
