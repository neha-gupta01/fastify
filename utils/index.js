const jwt = require("jsonwebtoken");

const getAuthToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const verifyAuthToken = (token) => {
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  console.log(verify);
  return verify;
};

module.exports = { getAuthToken, verifyAuthToken };
