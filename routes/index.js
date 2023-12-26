const skillRoutes = require("./skillRoutes");
const aboutRoutes = require("./aboutRoutes");
const cvRoutes = require("./cvRoutes");
const portfolioRoutes = require("./portfolioRoutes");
const orderRoutes = require("./orderRoutes");
const loginRoutes = require("./userLoginRoutes");
const signUp = require("./userSignUpRoutes");
module.exports = [
  ...skillRoutes,
  ...aboutRoutes,
  ...cvRoutes,
  ...portfolioRoutes,
  ...orderRoutes,
  ...loginRoutes,
  ...signUp,
];
