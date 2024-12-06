const Store = require('../models/Store');

// Get nearby stores
exports.getNearbyStores = async (req, res) => {
  const { longitude, latitude } = req.query;
  try {
    const stores = await Store.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
          $maxDistance: 5000, // 5 km radius
        },
      },
    });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new store
exports.createStore = async (req, res) => {
  const store = new Store(req.body);
  try {
    const savedStore = await store.save();
    res.status(201).json(savedStore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a store
exports.deleteStore = async (req, res) => {
  try {
    await Store.findByIdAndDelete(req.params.id);
    res.json({ message: 'Store deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
