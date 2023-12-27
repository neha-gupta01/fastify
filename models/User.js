const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
});

const User = mongoose.model("users", UserSchema);

module.exports = User;