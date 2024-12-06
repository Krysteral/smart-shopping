const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

// Get stores by location (city or zip)
router.get('/nearby/:location', async (req, res) => {
  try {
    const location = req.params.location;
    console.log('Searching for location:', location); // Debug log
    
    const stores = await Store.find({
      $or: [
        { city: new RegExp(location, 'i') },
        { zip: location }
      ]
    });
    
    console.log('Found stores:', stores); // Debug log
    
    if (stores.length === 0) {
      return res.status(404).json({ message: 'No stores found in this location' });
    }
    
    res.json(stores);
  } catch (error) {
    console.error('Store search error:', error);
    res.status(500).json({ message: 'Error searching stores' });
  }
});

// Add a route to get all stores (for debugging)
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
