const PortfolioController = require("../controllers/portfolioController");

module.exports = [
  {
    method: "GET",
    url: "/portfolio",
    handler: PortfolioController.getAllPortfolios,
  },
];
