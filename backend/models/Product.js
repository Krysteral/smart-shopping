const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
