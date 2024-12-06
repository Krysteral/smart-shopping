const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
  location: { type: String }, // User-entered address/zip code
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);
