const Countryform = require('../models/Countryform'); // Assuming the model is in models directory
exports.createCountryform = async (req, res) => {
    try {
        const { country_code, heading1, content1, heading2, content2, image1, image2, image3 } = req.body; 

        // let formattedContent2 = content2;
        // if (Array.isArray(content2)) {
        //     formattedContent2 = content2.join(' '); // Join array elements into a single string
        // }

        // let image1 = null;
        // let image2 = null;
        // let image3 = null;
        
        // if (req.files) {
        //     if (req.files.image1) image1 = req.files.image1[0].path;
        //     if (req.files.image2) image2 = req.files.image2[1].path;
        //     if (req.files.image3) image3 = req.files.image3[2].path;
        // }

        // const image1 = req.file ? req?.file?.originalname : null;
        // const image2 = req.file ? req?.file?.path : null;
        // const image3 = req.file ? req?.file?.path : null;

        if (!heading1 || !heading2 || !content2 || !image1) {
          return res.status(400).json({ error: "Name, code & image are required" });
        }
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
        res.status(201).json(savedCountryform); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCountryform = async (req, res) => {
    try {
        const countryformId = req.params.id;
        const updatedCountryform = await Countryform.findByIdAndUpdate(countryformId, req.body, { new: true });

        if (!updatedCountryform) {
            return res.status(404).json({ message: 'Countryform not found' });
        }

        res.status(200).json(updatedCountryform);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteCountryform = async (req, res) => {
    try {
        const countryformId = req.params.id;
        const deletedCountryform = await Countryform.findByIdAndDelete(countryformId);

        if (!deletedCountryform) {
            return res.status(404).json({ message: 'Countryform not found' });
        }

        res.status(200).json({ message: 'Countryform deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
