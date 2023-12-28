const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = (request, reply) => {
  console.log("REQUEST", request.body);
  const { firstName, lastName, email, password } = request.body;

  bcrypt.hash(password, 10, (hashError, hashedPassword) => {
    if (hashError) {
      console.error("Error hashing password:", hashError);
      reply
        .status(500)
        .send({ status: "error", message: "Internal server error" });
      return;
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userID: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    newUser.token = token;

    newUser
      .save()
      .then((savedUser) => {
        console.log("User created successfully:", savedUser);
        reply.send({
          status: "success",
          message: "User created Successfully",
          result: { token, data: savedUser },
        });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        reply
          .status(500)
          .send({ status: "error", message: "Internal server error" });
      });
  });
};

const login = (request, reply) => {
  const { email, password } = request.body;

  User.findOne({ email, password }).then((user) => {
    if (!user) {
      console.log("User not found");
      return reply
        .status(401)
        .send({ status: "error", message: "Invalid credentials" });
    }

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.token = token; // getAuthToken({})

    user
      .save()
      .then((updatedUser) => {
        reply.send({
          status: "success",
          message: "Login successful",
          result: { token, data: updatedUser },
        });
      })
      .catch((error) => {
        console.error("Error during login:", error);
        reply
          .status(500)
          .send({ status: "error", message: "Internal server error" });
      });
  });
};

const handleGetUserProfile = (request, reply) => {
  User.findById(request.user_id)
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return reply
          .status(401)
          .send({ status: "error", message: "Invalid credentials" });
      }

      reply.send({
        status: "success",
        message: "Successful",
        result: user,
      });
    })
    .catch((error) => {
      console.error("Error during login:", error);
      reply
        .status(500)
        .send({ status: "error", message: "Internal server error" });
    });
};

module.exports = { signUp, login, handleGetUserProfile };
