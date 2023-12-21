const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  personalInfo: {
    profileImage: String,
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  technicalSkills: [String],
  personalInterests: [String],
  profile: String,
  qualifications: [String],
  education: {
    year: String,
    institute: String,
    degree: String,
  },
  coursesTraining: {
    year: String,
    course: String,
    degree: String,
  },
  workExperience: {
    year: String,
    position: String,
    company: String,
  },
  extracurricularActivities: {
    organization: String,
    role: String,
    details: String,
  },
});

const cv = mongoose.model("cvs", cvSchema);

module.exports = cv;
