const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require("nodemailer");

// Get all orders for logged-in user
router.get('/getorders', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not logged in' });
    }
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Return orders array
    res.json({ orders: user.orders || [] });
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // your Gmail (stylehud@gmail.com)
    pass: process.env.EMAIL_PASS,   // app password from .env
  },
});
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


// Payments / Checkout
// Create order after successful Razorpay payment
router.post('/order', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not logged in' });
    }

    const { paymentId } = req.body;
    if (!paymentId) {
      return res.status(400).json({ error: 'paymentId is required' });
    }

    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const cartSnapshot = user.cart || [];
    const total = cartSnapshot.reduce((sum, p) => sum + (p.price || 0), 0);

    // Save order
    user.orders.push({
      orderId: paymentId,
      items: cartSnapshot,
      total: total,
      date: new Date(),
    });
    user.cart = [];
    await user.save();

    // Email to User
    const userMail = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your StyleHub Order Confirmation",
      html: `
        <h2>Hi ${user.name},</h2>
        <p>Thank you for your order! 🎉</p>
        <p><b>Order ID:</b> ${paymentId}</p>
        <p><b>Total:</b> ₹${total}</p>
        <h3>Items:</h3>
        <ul>
          ${cartSnapshot.map(item => `<li>${item.title} - ₹${item.price}</li>`).join("")}
        </ul>
        <p>We’ll notify you when your order ships.</p>
      `
    };

    // Email to Seller
    const sellerMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Order Received - ${paymentId}`,
      html: `
        <h2>New Order Alert 🚀</h2>
        <p><b>User:</b> ${user.name} (${user.email}, ${user.mobile})</p>
        <p><b>Order ID:</b> ${paymentId}</p>
        <p><b>Total:</b> ₹${total}</p>
        <h3>Items:</h3>
        <ul>
          ${cartSnapshot.map(item => `<li>${item.title} - ₹${item.price}</li>`).join("")}
        </ul>
      `
    };

    // Send emails
    await transporter.sendMail(userMail);
    await transporter.sendMail(sellerMail);

    return res.json({ message: 'Order recorded & emails sent ✅', user });
  } catch (err) {
    console.error('Order creation error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
