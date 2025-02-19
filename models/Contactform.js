const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, Default: Date.now },
});

const Contactform = mongoose.model("Contactform", messageSchema);

module.exports = Contactform;
