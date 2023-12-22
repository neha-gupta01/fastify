const CvController = require("../controllers/cvController");

module.exports = [
  {
    method: "GET",
    url: "/cv",
    handler: CvController.getCvData,
  },
];
