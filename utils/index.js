const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAuthToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const verifyAuthToken = (token, reply) => {
  if (!token) {
    return reply.status(400).send("Unauthorize");
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedPayload);

    return decodedPayload;
  } catch (error) {
    return reply.status(401).send("Unauthorize. Expired");
  }
};

const getEncryptedString = (string) => {
  return bcrypt.hash(string, 10);
};

const validateValueWithEncryptedValue = (value, encryptedValue) => {
  return bcrypt.compare(value, encryptedValue);
};

module.exports = { getAuthToken, verifyAuthToken, getEncryptedString, validateValueWithEncryptedValue };
