const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, mobile, email, password, address } = req.body;
    if (!name || !mobile || !email || !password || !address) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists.' });
    }
    // Store password as plain text
    const user = new User({
      name,
      mobile,
      email,
      password,
      address
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }
    // Compare plain text password
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }
    const { name, mobile, email: userEmail, address } = user;
    res.json({ user: { name, mobile, email: userEmail, address } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
