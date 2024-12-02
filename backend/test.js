// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    preferences: { type: Object },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' },
    sessionToken: { type: String },
    createdAt: { type: Date, default: Date.now }
  });
  const User = mongoose.model('User', userSchema);
  
  // Session Schema
  const sessionSchema = new mongoose.Schema({
    sessionStartTime: { type: Date, default: Date.now },
    temporaryShoppingList: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
    userIpAddress: String,
    createdAt: { type: Date, default: Date.now }
  });
  const Session = mongoose.model('Session', sessionSchema);
  
  // Store Schema
  const storeSchema = new mongoose.Schema({
    storeName: { type: String, required: true },
    storeLocation: { type: { type: String, enum: ['Point'], required: true }, coordinates: [Number] },
    storeAddress: String,
    storeContactInfo: String,
    createdAt: { type: Date, default: Date.now }
  });
  const Store = mongoose.model('Store', storeSchema);
  
  // Exporting all models
  module.exports = { User, Session, Store };