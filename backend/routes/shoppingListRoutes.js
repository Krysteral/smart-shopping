const express = require('express');
const ShoppingList = require('../models/ShoppingList');
const router = express.Router();

// GET all shopping lists
router.get('/', async (req, res) => {
  try {
    const shoppingLists = await ShoppingList.find();
    res.json(shoppingLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new shopping list
router.post('/', async (req, res) => {
  const { name, items } = req.body;

  if (!name || !items || !items.length) {
    return res.status(400).json({ message: "Name and items are required." });
  }

  const shoppingList = new ShoppingList({ name, items });

  try {
    const newShoppingList = await shoppingList.save();
    res.status(201).json(newShoppingList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a shopping list
router.delete('/:id', async (req, res) => {
  try {
    const deletedShoppingList = await ShoppingList.findByIdAndDelete(
      req.params.id
    );
    if (!deletedShoppingList) {
      return res.status(404).json({ message: "Shopping list not found." });
    }
    res.json({ message: "Shopping list deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
