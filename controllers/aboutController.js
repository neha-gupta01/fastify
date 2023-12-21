const About = require("../models/About");

const getAboutData = async (request, reply) => {
  try {
    const aboutData = await About.find({});
    reply.send(aboutData);
  } catch (error) {
    console.log("Error retrieving about data:", error);
    reply.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { getAboutData };
