const express = require('express');
const ShoppingList = require('../models/ShoppingList');
const router = express.Router();

// GET all shopping lists for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const lists = await ShoppingList.find({ user_id: req.params.userId });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new shopping list
router.post('/', async (req, res) => {
  const list = new ShoppingList(req.body);
  try {
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a shopping list
router.put('/:id', async (req, res) => {
  try {
    const updatedList = await ShoppingList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedList) {
      return res.status(404).json({ message: 'Shopping list not found' });
    }
    res.json(updatedList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a shopping list
router.delete('/:id', async (req, res) => {
  try {
    const deletedList = await ShoppingList.findByIdAndDelete(req.params.id);
    if (!deletedList) {
      return res.status(404).json({ message: 'Shopping list not found' });
    }
    res.json({ message: 'Shopping list deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
