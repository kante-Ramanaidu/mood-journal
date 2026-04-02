const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// SIGNUP
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0)
      return res.status(400).json({ message: 'User already exists' });

    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  try {
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userRes.rows.length === 0)
      return res.status(400).json({ message: 'User not found. Please sign up first.' });

    const user = userRes.rows[0];
    if (user.password !== password)
      return res.status(401).json({ message: 'Incorrect password' });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;