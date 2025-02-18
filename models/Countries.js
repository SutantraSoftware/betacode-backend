const mongoose = require('mongoose');

const countriesSchema = new mongoose.Schema({
  country_name: {
    type: String,
    required: true,
  },
  country_code: {
    type: String,
    required: true,
    unique: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Countries', countriesSchema);
