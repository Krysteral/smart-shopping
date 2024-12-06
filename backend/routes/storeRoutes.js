const express = require('express');
const Store = require('../models/Store');
const router = express.Router();

// GET nearby stores
router.get('/nearby', async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const stores = await Store.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: 5000 // 5 km
        }
      }
    });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
