const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  inventory: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      price: { type: Number, required: true }
    }
  ]
});

StoreSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Store', StoreSchema);
