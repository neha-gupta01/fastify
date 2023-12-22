const Skill = require("../models/Skill");

const getAllSkills = (request, reply) => {
  Skill.find({})
    .then((skillsData) => {
      reply.send(skillsData);
    })
    .catch((error) => {
      console.log("Error retrieving skills data:", error);
      reply.status(500).send({ error: "Internal server error" });
    });
};
module.exports = { getAllSkills };
