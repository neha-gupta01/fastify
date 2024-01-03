const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getAuthToken, verifyAuthToken } = require("../utils/index");

const fs = require("node:fs");
const util = require("node:util");
const { pipeline } = require("node:stream");
const pump = util.promisify(pipeline);

const signUp = async (request, reply) => {
  try {
    const { firstName, lastName, email, password } = request.body;

    const newUser = new User({
      //  profileImage ,
      firstName,
      lastName,
      email,
      password,
    });

    const token = getAuthToken({ user_id: newUser._id });

    newUser.token = token;
    const savedUser = await newUser.save();
    const userWithoutSensitiveData = await User.findById(savedUser._id).select(
      "-password -token -__v"
    );

    const responseData = {
      status: "success",
      message: "User created Successfully",
      result: { token, data: userWithoutSensitiveData },
    };

    reply.send(responseData);
  } catch (error) {
    console.error("Error in signUp:", error);
    reply
      .status(500)
      .send({ status: "error", message: "Internal server error" });
  }
};

const login = async (request, reply) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return reply
        .status(404)
        .send({ status: "error", message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      console.log("Password does not match");
      return reply
        .status(401)
        .send({ status: "error", message: "Invalid credentials" });
    }
    const token = getAuthToken({ user_id: user._id });

    user.token = token;
    const userWithoutSensitiveData = await User.findById(user._id).select(
      "-password -token -__v"
    );

    const responseData = {
      status: "success",
      message: "Login successful",
      result: { token, data: userWithoutSensitiveData },
    };

    reply.send(responseData);
  } catch (error) {
    console.error("Error in login:", error);
    reply
      .status(500)
      .send({ status: "error", message: "Internal server error" });
  }
};

const handleGetUserProfile = (request, reply) => {
  User.findById(request.user_id)
    .select("-password -token -__v")
    .then((user) => {
      reply.send({
        status: "success",
        message: "Successful",
        result: user,
      });
    })
    .catch((error) => {
      console.error("Error in handleGetUserProfile:", error);
      reply
        .status(500)
        .send({ status: "error", message: "Internal server error" });
    });
};

const handleFileUpload = async (request, reply) => {
  //   console.log("request.body===>>>", request.body)
  //   console.log("request.files----->>>", request.files)
  let sampleFile = request.body.file;
  // console.log({ sampleFile }, sampleFile[0]);
  //   // const parts = request.files()
  //   // for await (const part of parts) {
  //   //   console.log("part----------", part)
  //     await pump(sampleFile.file, fs.createWriteStream(sampleFile.filename))
  //   // }

  // const files = await request.saveRequestFiles()
  // console.log(files)

  new Buffer(sampleFile[0].data, "base64");
  let sub_path = sampleFile[0].filename;
  let filepath = "public/" + sub_path;
  fs.writeFile(filepath, sampleFile[0].data, async (error) => {
    if (error) {
      // handleLogError(error);
      console.log("Error persist while uploading a file ", error);
      // reject(error);
    }
    console.log("File uploaded successfully");
    // resolve({ url: filepath, sub_path, media_type, name });
  });
  // files[0].type // "file"
  // files[0].filepath
  // files[0].fieldname
  // files[0].filename
  // files[0].encoding
  // files[0].mimetype
  // files[0].fields // other parsed parts

  //   const data = await request.files()
  // console.log({data}, data.file)
  // data.file // stream
  // data.fields // other parsed parts
  // data.fieldname
  // data.filename
  // data.encoding
  // data.mimetype

  // to accumulate the file in memory! Be careful!
  //
  // await data.toBuffer() // Buffer
  //
  // or

  // await pump(data.file, fs.createWriteStream(data.filename))

  // be careful of permission issues on disk and not overwrite
  // sensitive files that could cause security risks

  // also, consider that if the file stream is not consumed, the promise will never fulfill

  // reply.send()

  reply.send({
    status: "success",
    message: "Successful",
    result: {},
  });
};

module.exports = { signUp, login, handleGetUserProfile, handleFileUpload };
