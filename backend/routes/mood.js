const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// SAVE MOOD
router.post('/', async (req, res) => {
  const { email, mood, triggers } = req.body;
  if (!email || !mood)
    return res.status(400).json({ message: 'Email and mood are required' });

  try {
    await pool.query(
      'INSERT INTO moods (email, mood, triggers, created_at) VALUES ($1, $2, $3, NOW())',
      [email, mood, triggers || []]
    );
    res.status(201).json({ message: '' });
  } catch (err) {
    console.error('Error saving mood:', err.message);
    res.status(500).json({ message: 'Error saving mood' });
  }
});

// MOOD HISTORY
router.get('/history', async (req, res) => {
  const { email, days, triggers } = req.query;
  if (!email || !days)
    return res.status(400).json({ message: 'Missing email or days parameter' });

  const daysInt = parseInt(days);
  if (isNaN(daysInt) || daysInt <= 0 || daysInt > 365)
    return res.status(400).json({ message: 'Invalid days parameter. Must be between 1 and 365.' });

  let triggersArray = [];
  if (triggers)
    triggersArray = triggers.split(',').map(t => t.trim()).filter(t => t.length > 0);

  try {
    let queryText = `
      SELECT mood, triggers, created_at
      FROM moods
      WHERE email = $1
        AND created_at >= NOW() - INTERVAL '${daysInt} days'
    `;
    const queryParams = [email];

    if (triggersArray.length > 0) {
      queryText += ` AND triggers && $2::text[]`;
      queryParams.push(triggersArray);
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await pool.query(queryText, queryParams);
    const moodHistory = result.rows;

    const triggerCounts = {};
    moodHistory.forEach(entry => {
      (entry.triggers || []).forEach(trigger => {
        triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
      });
    });

    res.json({ moodHistory, triggerCounts });
  } catch (err) {
    console.error('Mood history error:', err.message);
    res.status(500).json({ message: 'Server error while retrieving mood history' });
  }
});

module.exports = router;