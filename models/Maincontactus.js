const moment = require("moment-timezone"); // Import moment-timezone
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  project: { type: String },
  subject: { type: String },
  message: { type: String },
  createdAt: {
    type: Date,
    default: () => moment.tz("Asia/Kolkata").toDate(), // Set to local time (India Standard Time, UTC+5:30)
  },
});

const Maincontactus = mongoose.model("Maincontactus", messageSchema);

module.exports = Maincontactus;
