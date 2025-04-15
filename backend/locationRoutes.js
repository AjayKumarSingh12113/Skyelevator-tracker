const express = require('express');
const router = express.Router();
const { User, Location } = require('./db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (!user) {
    user = new User({ username, password });
    await user.save();
  }
  res.json({ message: 'User logged in', userId: user._id, username: user.username });
});

router.post('/', async (req, res) => {
  const data = new Location(req.body);
  await data.save();
  res.json({ message: 'Location saved' });
});

router.get('/', async (req, res) => {
  const data = await Location.find();
  res.json(data);
});

module.exports = router;

