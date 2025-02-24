const Countries = require('../models/Countries');
const fs = require('fs');

exports.insertCountry = async (req, res) => {
  try {
    console.log(req.body);
    const { country_name, country_code } = req.body;
    const imagePath = req.file ? req.file.path : null;
    if (!country_name || !country_code) {
      return res.status(400).json({ error: 'Name and code are required' });
    }

    const newCountry = new Countries({
      country_name,
      country_code,
      imagePath,
    });

    await newCountry.save();
    res.json({ message: 'Country added successfully', country: newCountry });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to insert country' });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { country_name, country_code } = req.body;

    let country = await Countries.findById(id);
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    // Delete the old image if a new one is uploaded
    if (req.file) {
      if (country.imagePath) {
        fs.unlinkSync(country.imagePath); // Remove old image from storage
      }
      country.imagePath = req.file.path; // Set new image path
    }

    // Update other fields
    country.country_name = country_name || country.country_name;
    country.country_code = country_code || country.country_code;

    await country.save();
    res.json({ message: 'Country updated successfully', country });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update country' });
  }
};
exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    let country = await Countries.findById(id);
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    // Delete image file if it exists
    if (country.imagePath) {
      fs.unlinkSync(country.imagePath); // Remove image from storage
    }

    // Delete country from database
    await Countries.findByIdAndDelete(id);

    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete country' });
  }
};

exports.getAllCountries = async (req, res) => {
  try {
    const posts = await Countries.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send('Error getting posts : ' + error.message);
  }
};
