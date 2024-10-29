const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.models.Store || mongoose.model('Store', storeSchema);
