const About = require("../models/About");

const getAboutData = (request, reply) => {
  About.find({})
    .then((aboutData) => {
      reply.send(aboutData);
    })
    .catch((error) => {
      console.log("Error retrieving about data:", error);
      reply.status(500).send({ error: "Internal server error" });
    });
};

module.exports = { getAboutData };
