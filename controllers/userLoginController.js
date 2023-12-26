const User = require("../models/UserLogin");

const login = (request, reply) => {
  const { email, password } = request.body;

  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        console.log("Login successful:", user);
      } else {
        console.log("Invalid credentials");
        reply
          .status(401)
          .send({ success: false, error: "Invalid credentials" });
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      reply
        .status(500)
        .send({ success: false, error: "Internal server error" });
    });
};

module.exports = { login };
