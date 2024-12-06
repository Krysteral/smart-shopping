const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema({
    list_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Nullable for guest users
    session_id: { type: String, required: false }, // For guest sessions
    items: [
      {
        name: { type: String, required: true }, // Name from user input
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false }, // Matched product
        store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: false } // Store where it’s found
      }
    ],
    location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: [Number] }, // GeoJSON format
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('ShoppingList', ShoppingListSchema);
  
