const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: [Number] },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // References to Product IDs
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Store', StoreSchema);

