const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  year: String,
  title: String,
  description: String,
  image: String,
});

const about = mongoose.model("abouts", aboutSchema);

module.exports = about;
