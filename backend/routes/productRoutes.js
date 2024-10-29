const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
    try {
      const products = await Product.find().populate('store'); // Populate store details
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });  

// POST a new product
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
