const User = require("../models/UserSignUp");

const signUp = (request, reply) => {
  const { firstName, lastName, email, password } = request.body;

  const newUser = new User({ firstName, lastName, email, password });

  newUser
    .save()
    .then((savedUser) => {
      console.log("User created successfully:", savedUser);
      reply.send({ user: savedUser });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      reply
        .status(500)
        .send({ success: false, error: "Internal server error" });
    });
};

module.exports = { signUp };
