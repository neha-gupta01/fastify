const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //profileImage: String,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    token: String,
  },
  {
    toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
