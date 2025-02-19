const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
  date: { type: String },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  selected: { type: Boolean, default: false },
});

module.exports = mongoose.model("Blog", postSchema);
