const fastify = require("fastify")();
const cors = require("@fastify/cors");
const mongoose = require("mongoose");

fastify.register(cors, {
  origin: true,
});

mongoose
  .connect("mongodb+srv://neha:neha123@cluster.5xagc1y.mongodb.net/MyDB")
  .then(() => {
    console.log("Connected");
  });

// const SkillSchema = new mongoose.Schema({
//   icon: String,
//   skill: String,
//   description: String,
// });
//const Skill = mongoose.model("skills", SkillSchema);

// const AboutSchema = new mongoose.Schema({
//   year: String,
//   title: String,
//   description: String,
//   image: String,
// });

// const About = mongoose.model("abouts", AboutSchema);

const CvSchema = new mongoose.Schema({
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

const Cv = mongoose.model("cvs", CvSchema);

const PortfolioSchema = new mongoose.Schema({
  imageSrc: String,
  title: String,
  description: String,
  price: Number,
  technologies: [String],
});

const Portfolio = mongoose.model("portfolios", PortfolioSchema);

fastify.listen({ port: 3001 }).then(() => {
  console.log("Logged");
});

fastify.get("/", (req, reply) => {
  reply.send({ hello: "world" });
});

fastify.get("/portfolio", (request, reply) => {
  let {
    current_page = 1,
    page_size = 4,
    searchTitle = "",
    selectedTechnologies = "",
    minPrice = 0,
    maxPrice = 100,
    sortBy,
  } = request.query;

  Portfolio.find()
    .then((data) => {
      selectedTechnologies = selectedTechnologies
        .split(",")
        .filter((tech) => tech.trim() !== "");

      // let filteredResult = [];
      // filteredResult = portfolioList.filter((item) => {
      //   if (
      //     searchTitle &&
      //     !item.title.toLowerCase().includes(searchTitle.toLowerCase())
      //   ) {
      //     return false;
      //   }
      //   if (selectedTechnologies.length > 0) {
      //     const commonTechnologies = item.technologies.filter((tech) =>
      //       selectedTechnologies.includes(tech)
      //     );
      //     if (selectedTechnologies.length !== commonTechnologies.length) {
      //       return false;
      //     }
      //   }
      //   if (minPrice && item.price < parseInt(minPrice)) {
      //     return false;
      //   }
      //   if (maxPrice && item.price > parseInt(maxPrice)) {
      //     return false;
      //   }
      //   return true;
      // });

      // if (sortBy === "lowToHigh") {
      //   filteredResult.sort((a, b) => a.price - b.price);
      // } else if (sortBy === "highToLow") {
      //   filteredResult.sort((a, b) => b.price - a.price);
      // }

      // const startIndex = (current_page - 1) * page_size;
      // const endIndex = startIndex + parseInt(page_size);
      // const paginatedData = filteredResult.slice(startIndex, endIndex);

      reply.send({
        data: data,
        paginate: {
          current_page: parseInt(current_page),
          total_page: Math.ceil(data.length / page_size),
          page_size: parseInt(page_size),
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// fastify.get("/about", async (request, reply) => {
//   try {
//     const aboutData = await About.find({});
//     reply.send(aboutData);
//   } catch (error) {
//     console.log("Error retrieving about data:", error);
//     reply.status(500).send({ error: "Internal server error" });
//   }
// });

fastify.get("/cv", async (request, reply) => {
  try {
    const cvData = await Cv.find({});
    reply.send(cvData);
    console.log(cvData);
  } catch (error) {
    console.log("Error retrieving cv data:", error);
    reply.status(500).send({ error: "Internal server error" });
  }
});

// fastify.get("/skills", async (request, reply) => {
//   try {
//     const skillsData = await Skill.find({});
//     reply.send(skillsData);
//   } catch (error) {
//     console.log("Error retrieving skills data:", error);
//     reply.status(500).send({ error: "Internal server error" });
//   }
// });
let allRoutes = require("./routes");
allRoutes.forEach((route) => {
  fastify.route(route);
});
// fastify.register(require("./routes/skillRoute"));
