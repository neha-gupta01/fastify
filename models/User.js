const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    image: String,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    token: String,
  },
  {
    toJSON: { virtuals: true, versionKey: false },
  }
);

UserSchema.virtual("imageUrl").get(function () {
  return this.image ? "http://127.0.0.1:3001/public/" + this.image : "";
});

UserSchema.virtual("fullName").get(function () {
  return this.firstName + " " + (this.lastName || "");
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
