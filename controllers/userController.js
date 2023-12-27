const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = (request, reply) => {
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

  User.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt.compare(
          password,
          user.password,
          (compareError, isPasswordValid) => {
            if (compareError) {
              console.error("Error comparing passwords:", compareError);
              reply
                .status(500)
                .send({ status: "error", message: "Internal server error" });
              return;
            }

            if (isPasswordValid) {
              console.log("Login successful:", user);
              const token = jwt.sign(
                { userID: user._id },
                process.env.JWT_SECRET,
                {
                  expiresIn: "1h",
                }
              );

              user.token = token;

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
                  console.error("Error updating user token:", error);
                  reply.status(500).send({
                    status: "error",
                    message: "Internal server error",
                  });
                });
            } else {
              console.log("Incorrect password");
              reply
                .status(401)
                .send({ status: "error", message: "Invalid credentials" });
            }
          }
        );
      } else {
        console.log("User not found");
        reply
          .status(401)
          .send({ status: "error", message: "Invalid credentials" });
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      reply
        .status(500)
        .send({ status: "error", message: "Internal server error" });
    });
};

module.exports = { signUp, login };
