const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const locationRoutes = require('./locationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/skyelevator', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/location', locationRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));


