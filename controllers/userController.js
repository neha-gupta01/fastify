const User = require("../models/User");
const {
  getAuthToken,
  validateValueWithEncryptedValue,
  handleFileUploading,
} = require("../utils/index");

const fs = require("node:fs");

const signUp = async (request, reply) => {
  try {
    const { firstName, lastName, email, password, image } = request.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const token = getAuthToken({ user_id: newUser._id });

    newUser.token = token;
    const savedUser = await newUser.save();

    if (image && image.length) {
      let uploaded_path = await handleFileUploading(image[0]);
      savedUser.image = uploaded_path;
      await savedUser.save();
    }

    const responseData = {
      status: "success",
      message: "User created Successfully",
      result: { token, data: handleUserOnResponse(savedUser) },
    };

    reply.send(responseData);
  } catch (error) {
    console.error("Error in signUp:", error);
    reply
      .status(500)
      .send({ status: "error", message: "Internal server error" });
  }
};

const login = (request, reply) => {
  const { email, password } = request.body;

  User.findOne({ email })
    .select("-__v")
    .then((user) => {
      if (!user) {
        return reply
          .status(404)
          .send({ status: "error", message: "User not found" });
      }

      validateValueWithEncryptedValue(password, user.password).then(
        (isMatched) => {
          if (!isMatched) {
            return reply
              .status(404)
              .send({ status: "error", message: "Password did not match" });
          }

          (async () => {
            const token = getAuthToken({ user_id: user._id });
            user.token = token;
            await user.save();

            const responseData = {
              status: "success",
              message: "Login successful",
              result: { token, data: handleUserOnResponse(user) },
            };
            return reply.send(responseData);
          })();
        }
      );
    });
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
  console.log({ sampleFile });
  //   // const parts = request.files()
  //   // for await (const part of parts) {
  //   //   console.log("part----------", part)
  //     await pump(sampleFile.file, fs.createWriteStream(sampleFile.filename))
  //   // }

  // const files = await request.saveRequestFiles()
  // console.log(files)

  // new Buffer(sampleFile[0].data, "base64");
  let sub_path = sampleFile[0].filename;
  let filepath = "assets/" + sub_path;
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

const handleUserOnResponse = (user) => {
  user = user.toJSON();

  if (user.password) {
    delete user.password;
  }

  if (user.token) {
    delete user.token;
  }

  return user;
};

module.exports = { signUp, login, handleGetUserProfile, handleFileUpload };
