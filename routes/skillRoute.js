const SkillController = require("../controllers/skillController");

module.exports = [
  {
    method: "GET",
    url: "/skills",
    handler: SkillController.getAllSkills,
  },
];
