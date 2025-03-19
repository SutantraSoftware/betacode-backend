const mongoose = require("mongoose");
const moment = require("moment-timezone");  // Import moment-timezone

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String,},
  createdAt: {
    type: Date,
    default: () => moment.tz("Asia/Kolkata").toDate(),  // Set to local time (India Standard Time, UTC+5:30)
  },
});

const Contactform = mongoose.model("Contactform", messageSchema);

module.exports = Contactform;
