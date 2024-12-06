const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
