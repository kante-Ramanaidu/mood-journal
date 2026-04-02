const express = require('express');
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

router.get('/', async (req, res) => {
  const { mood, pageToken } = req.query;
  if (!mood)
    return res.status(400).json({ message: 'Mood is required' });

  const query = encodeURIComponent(`${mood} music`);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=5&key=${YOUTUBE_API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error)
      return res.status(500).json({ message: 'YouTube API error', error: data.error });

    res.status(200).json(data);
  } catch (err) {
    console.error('YouTube fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch songs', error: err.message });
  }
});

module.exports = router;