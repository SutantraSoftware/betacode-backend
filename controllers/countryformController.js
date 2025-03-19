const Countryform = require("../models/Countryform");
exports.createCountryform = async (req, res) => {
  try {
    const {
      country_code,
      heading1,
      content1,
      heading2,
      content2,
      image1,
      image2,
      image3,
    } = req.body;

    // if (!country_code || !heading1 || !heading2 || !content2 || !image1) {
    //   return res.status(400).json({
    //     error:
    //       "Country_code, heading1, heading2, content2 & image1 are required",
    //   });
    // }
    const newCountryform = new Countryform({
      country_code,
      heading1,
      content1,
      image1,
      image2,
      image3,
      heading2,
      content2,
    });

    const savedCountryform = await newCountryform.save();
    console.log(savedCountryform);
    res.status(201).json(savedCountryform);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSingleCountryform = async (req, res) => {
  try {
    const { country_code } = req.query;

    if (!country_code) {
      return res.status(400).json({ message: "country_code is required" });
    }

    const country = await Countryform.findOne({ country_code });

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateCountryform = async (req, res) => {
  try {
    const countryformId = req.params.id;
    const updatedCountryform = await Countryform.findByIdAndUpdate(
      countryformId,
      req.body,
      { new: true }
    );

    if (!updatedCountryform) {
      return res.status(404).json({ message: "Countryform not found" });
    }

    res.status(200).json(updatedCountryform);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCountryform = async (req, res) => {
  try {
    const countryformId = req.params.id;
    const deletedCountryform = await Countryform.findByIdAndDelete(
      countryformId
    );

    if (!deletedCountryform) {
      return res.status(404).json({ message: "Countryform not found" });
    }

    res.status(200).json({ message: "Countryform deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
