const express = require('express');
const ShoppingList = require('../models/ShoppingList');
const router = express.Router();

// POST a shopping list
router.post('/', async (req, res) => {
  try {
    const shoppingList = new ShoppingList(req.body);
    const savedList = await shoppingList.save();
    res.status(201).json(savedList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all shopping lists
router.get('/', async (req, res) => {
  try {
    const lists = await ShoppingList.find().populate('items.productId');
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
