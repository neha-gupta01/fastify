const Skill = require("../models/Skill");

const getAllSkills = async (request, reply) => {
  try {
    const skillsData = await Skill.find({});
    reply.send(skillsData);
  } catch (error) {
    console.log("Error retrieving skills data:", error);
    reply.status(500).send({ error: "Internal server error" });
  }
};
module.exports = { getAllSkills };
