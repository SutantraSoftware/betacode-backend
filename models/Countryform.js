const mongoose = require("mongoose");


const CountryformSchema = new mongoose.Schema({
    country_code : {
        type : String,
    },
    heading1:{
        type : String,
    },
    content1:{
        type: String,
    },
    image1:{
        type: String,

    },
    image2:{
        type: String,

    },
    image3:{
        type: String,
    
    },
    heading2:{
        type : String,
    },
    content2:{
        type : String,
    }
});


module.exports = mongoose.model("Countryform", CountryformSchema)