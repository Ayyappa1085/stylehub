const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, mobile, email, password, address } = req.body;

    // check for required fields
    if (!name || !mobile || !email || !password || !address) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    // store password as plain text (no hashing)
    const user = new User({ name, mobile, email, password, address });
    await user.save();

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  req.session.userId = user._id;  // store session
  await req.session.save();       // ensure session saved
  res.json({ user });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid'); // default cookie name from express-session
    return res.json({ message: 'Logged out' });
  });
});

// Me
router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const user = await User.findById(req.session.userId);
  res.json({ user });
});

// Like product
router.post('/like', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const { product } = req.body;
  const user = await User.findById(req.session.userId);
  user.likes.push(product);
  await user.save();
  res.json({ likes: user.likes });
});

// Add to cart
router.post('/cart', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const { product } = req.body;
  const user = await User.findById(req.session.userId);
  user.cart.push(product);
  await user.save();
  res.json({ cart: user.cart });
});

// Remove product from likes
// Remove product from likes
// Remove product from likes
// Remove product from likes
router.post("/unlike", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const { productId, title } = req.body;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required." });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.likes = user.likes.filter(
      (item) => !(item.id?.toString() === productId.toString() && item.title === title)
    );

    await user.save();
    res.json({ message: "Removed from likes", likes: user.likes });
  } catch (err) {
    console.error("Unlike error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

router.post("/remove-cart", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const { productId, title } = req.body;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required." });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // remove item by matching id (and title if needed)
    user.cart = user.cart.filter(
      (item) => !(item.id?.toString() === productId.toString() && (!title || item.title === title))
    );

    await user.save();
    res.json({ message: "Removed from cart", cart: user.cart }); // ✅ fixed
  } catch (err) {
    console.error("Remove-cart error:", err);
    res.status(500).json({ error: "Server error." });
  }
});





module.exports = router;
