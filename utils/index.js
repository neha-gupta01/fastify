const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("node:fs");

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

const handleFileUploading = (file, sub_path = "") => {
  return new Promise((resolve, reject) => {
    sub_path = sub_path + file.filename;
    let filepath = "assets/" + sub_path;
    fs.writeFile(filepath, file.data, (error) => {
      if (error) {
        console.log("Error persist while uploading a file ", error);
        return reject(error);
      }
      console.log("File uploaded successfully");
      resolve(sub_path);
    });
  });
};

module.exports = {
  getAuthToken,
  verifyAuthToken,
  getEncryptedString,
  validateValueWithEncryptedValue,
  handleFileUploading,
};
