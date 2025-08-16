const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  likes: { type: [String], default: [] },
  cart: { type: [String], default: [] },
  orders: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
