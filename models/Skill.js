const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  icon: String,
  skill: String,
  description: String,
});

const skill = mongoose.model("skills", skillSchema);

module.exports = skill;
