const Cv = require("../models/Cv");

const getCvData = async (request, reply) => {
  try {
    const cvData = await Cv.find({});
    reply.send(cvData);
    console.log(cvData);
  } catch (error) {
    console.log("Error retrieving cv data:", error);
    reply.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { getCvData };
