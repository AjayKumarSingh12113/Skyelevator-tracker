const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

const locationSchema = new mongoose.Schema({
  userId: String,
  username: String,
  type: String, // "login" or "logout"
  lat: Number,
  lng: Number,
  address: String,
  timestamp: String
});
const Location = mongoose.model('Location', locationSchema);

module.exports = { User, Location };