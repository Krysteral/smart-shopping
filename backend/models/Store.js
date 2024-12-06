const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  product: { type: String, required: true },
  price: { type: Number, required: true },
});

const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  inventory: [InventorySchema],
});

module.exports = mongoose.model('Store', StoreSchema);