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

const SkillSchema = new mongoose.Schema({
  icon: String,
  skill: String,
  description: String,
});

const Skill = mongoose.model("skills", SkillSchema);

const AboutSchema = new mongoose.Schema({
  year: String,
  title: String,
  description: String,
  image: String,
});

const About = mongoose.model("abouts", AboutSchema);

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

const Portfolio = mongoose.model("portfolio", PortfolioSchema);

fastify.listen({ port: 3001 }).then(() => {
  console.log("Logged");
});

// const cvData = {
//   personalInfo: {
//     profileImage: "images/profile.jpg",
//     name: "James Anderson",
//     email: " your.email@example.com",
//     phone: "(123) 456-7890",
//     address: "Your address",
//   },
//   technicalSkills: ["HTML", "CSS", "Javascript"],
//   personalInterests: ["Interest 1", "Interest 2", "Interest 3"],
//   profile:
//     "Write a brief description of yourself, your background, and your goals. Highlight your key strengths and experiences. ",
//   qualifications: ["Qualification 1", "Qualification 2", "Qualification 3"],
//   eduction: {
//     year: "Year - Year",
//     institute: "University/Institution",
//     degree: "Degree/Program",
//   },
//   coursesTraining: {
//     year: "Year",
//     course: "Course/Training",
//     degree: "Institution/Organization",
//   },
//   workExperience: {
//     year: "Year - Year",
//     position: "Job Position",
//     company: "Company/Organization",
//   },
//   extracurricularActivities: {
//     organization: "Organization Name",
//     role: "Role/Position",
//     details: "Details of your involvement and contributions",
//   },
// };

const portfolioList = [
  {
    id: 1,
    imageSrc: "images/e-commerce.png",
    title: "E-commerce Website",
    description: "HTML/CSS/JavaScript",
    price: 59,
    technologies: ["HTML", "Javascript"],
  },
  {
    id: 2,
    imageSrc: "images/landing-page.jpg",
    title: "Landing Page",
    description: "HTML/CSS/Bootstrap",
    price: 12,
    technologies: ["HTML", "CSS", "Bootstrap"],
  },
  {
    id: 3,
    imageSrc: "images/calculator-app.jpg",
    title: "Calculator App",
    description: "HTML/CSS/Javascript",
    price: 46,
    technologies: ["HTML", "CSS", "Javascript"],
  },
  {
    id: 4,
    imageSrc: "images/blog.jpg",
    title: "Blog Website",
    description: "HTML/CSS/PHP",
    price: 40,
    technologies: ["HTML", "CSS", "PHP"],
  },
  {
    id: 5,
    imageSrc: "images/task.jpg",
    title: "Task Management App",
    description: "ReactJS",
    price: 25,
    technologies: ["ReactJS"],
  },
  {
    id: 6,
    imageSrc: "images/data.jpg",
    title: "Data Visualization",
    description: "Python/Plotly",
    price: 20,
    technologies: ["Python", "Plotly"],
  },
  {
    id: 7,
    imageSrc: "images/data.jpg",
    title: "Data Visualization",
    description: "Python/Plotly",
    price: 27,
    technologies: ["Python", "Plotly"],
  },
  {
    id: 8,
    imageSrc: "images/data.jpg",
    title: "Data Visualization",
    description: "Python/Plotly",
    price: 62,
    technologies: ["Python", "Plotly"],
  },
  {
    id: 9,
    imageSrc: "images/data.jpg",
    title: "Data Visualization",
    description: "Python/Plotly",
    price: 14,
    technologies: ["Python", "Plotly"],
  },
  {
    id: 10,
    imageSrc: "images/data.jpg",
    title: "Data Visualization",
    description: "Python/Plotly",
    price: 50,
    technologies: ["Python", "Plotly"],
  },
  {
    id: 11,
    imageSrc: "images/data.jpg",
    title: "Data Visualization",
    description: "Python/Plotly",
    price: 55,
    technologies: ["Python", "Plotly"],
  },
  {
    id: 12,
    imageSrc: "images/data.jpg",
    title: "Data Visualization",
    description: "Python/Plotly",
    price: 5,
    technologies: ["Python", "Plotly"],
  },
  {
    id: 13,
    imageSrc: "images/data.jpg",
    title: "Data Visualization",
    description: "Python/Plotly",
    price: 19,
    technologies: ["Python", "Plotly"],
  },
  {
    id: 14,
    imageSrc: "images/data.jpg",
    title: "Data Visualization",
    description: "Python/Plotly",
    price: 7,
    technologies: ["Python", "Plotly"],
  },
];

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

  selectedTechnologies = selectedTechnologies
    .split(",")
    .filter((tech) => tech.trim() !== "");
  //to-do blank string filtered array

  let filteredResult = [];
  filteredResult = portfolioList.filter((item) => {
    if (
      searchTitle &&
      !item.title.toLowerCase().includes(searchTitle.toLowerCase())
    ) {
      return false;
    }
    if (selectedTechnologies.length > 0) {
      const commonTechnologies = item.technologies.filter((tech) =>
        selectedTechnologies.includes(tech)
      );
      if (selectedTechnologies.length !== commonTechnologies.length) {
        return false;
      }
    }
    if (minPrice && item.price < parseInt(minPrice)) {
      return false;
    }
    if (maxPrice && item.price > parseInt(maxPrice)) {
      return false;
    }
    return true;
  });

  if (sortBy === "lowToHigh") {
    filteredResult.sort((a, b) => a.price - b.price);
  } else if (sortBy === "highToLow") {
    filteredResult.sort((a, b) => b.price - a.price);
  }

  const startIndex = (current_page - 1) * page_size;
  const endIndex = startIndex + parseInt(page_size);
  const paginatedData = filteredResult.slice(startIndex, endIndex);

  reply.send({
    data: paginatedData,
    paginate: {
      current_page: parseInt(current_page),
      total_page: Math.ceil(filteredResult.length / page_size),
      page_size: parseInt(page_size),
    },
  });
});

fastify.get("/about", async (request, reply) => {
  try {
    const aboutData = await About.find({});
    reply.send(aboutData);
  } catch (error) {
    console.log("Error retrieving about data:", error);
    reply.status(500).send({ error: "Internal server error" });
  }
});

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

fastify.get("/skills", async (request, reply) => {
  try {
    const skillsData = await Skill.find({});
    reply.send(skillsData);
  } catch (error) {
    console.log("Error retrieving skills data:", error);
    reply.status(500).send({ error: "Internal server error" });
  }
});
