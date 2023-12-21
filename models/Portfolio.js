const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  imageSrc: String,
  title: String,
  description: String,
  price: Number,
  technologies: [String],
});

const portfolio = mongoose.model("portfolios", portfolioSchema);

module.exports = portfolio;
