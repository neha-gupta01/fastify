const Cv = require("../models/Cv");

const getCvData = (request, reply) => {
  Cv.find({})
    .then((cvData) => {
      reply.send(cvData);
    })
    .catch((error) => {
      console.log("Error retrieving cv data:", error);
      reply.status(500).send({ error: "Internal server error" });
    });
};

module.exports = { getCvData };
