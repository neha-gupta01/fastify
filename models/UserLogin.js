const mongoose = require("mongoose");

const loginUserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const loginUser = mongoose.model("loginUsers", loginUserSchema);

module.exports = loginUser;
