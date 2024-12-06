const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    price_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    price: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Price', PriceSchema);
  