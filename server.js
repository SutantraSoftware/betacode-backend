const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authController = require('./controllers/authController');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 6000;

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected Succesfully!');
  })
  .catch((error) => {
    console.log(`${error}`);
  });

// Routes
app.post('/register', authController.register);
app.post('/login', authController.login);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
