const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getAuthToken, verifyAuthToken } = require("../utils/index");

const signUp = async (request, reply) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    console.log(password);

    const newUser = new User({
      //  profileImage ,
      firstName,
      lastName,
      email,
      password,
    });

    const token = getAuthToken({ user_id: newUser._id });

    newUser.token = token;
    const savedUser = await newUser.save();
    const userWithoutSensitiveData = await User.findById(savedUser._id).select({
      password: 0,
      token: 0,
    });

    const responseData = {
      status: "success",
      message: "User created Successfully",
      result: { token, data: userWithoutSensitiveData },
    };

    reply.send(responseData);
  } catch (error) {
    console.error("Error in signUp:", error);
    reply
      .status(500)
      .send({ status: "error", message: "Internal server error" });
  }
};

const login = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return reply
        .status(404)
        .send({ status: "error", message: "User not found" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      console.log("Password does not match");
      return reply
        .status(401)
        .send({ status: "error", message: "Invalid credentials" });
    }
    const token = getAuthToken({ user_id: user._id });

    user.token = token;
    const userWithoutSensitiveData = await User.findById(user._id).select({
      password: 0,
      token: 0,
    });

    const responseData = {
      status: "success",
      message: "Login successful",
      result: { token, data: userWithoutSensitiveData },
    };

    reply.send(responseData);
  } catch (error) {
    console.error("Error in login:", error);
    reply
      .status(500)
      .send({ status: "error", message: "Internal server error" });
  }
};

const handleGetUserProfile = (request, reply) => {
  User.findById(request.user_id)
    .select("-password -token -__v")
    .then((user) => {
      reply.send({
        status: "success",
        message: "Successful",
        result: user,
      });
    })
    .catch(function error(error) {
      console.error("Error in handleGetUserProfile:", error);
      reply
        .status(500)
        .send({ status: "error", message: "Internal server error" });
    });
};

module.exports = { signUp, login, handleGetUserProfile };
