const mongoose = require("mongoose");

const signUpUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

const signUpUser = mongoose.model("signUpUsers", signUpUserSchema);

module.exports = signUpUser;
