const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  subtitle: String,
  price: Number,
  oldPrice: Number,
  discount: Number,
  image: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  likes: { type: [productSchema], default: [] },
  cart: { type: [productSchema], default: [] },
  orders: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
