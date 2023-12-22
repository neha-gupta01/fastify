const AboutController = require("../controllers/aboutController");

module.exports = [
  {
    method: "GET",
    url: "/about",
    handler: AboutController.getAboutData,
  },
];
