const fastify = require("fastify")();
const cors = require("@fastify/cors");

fastify.register(cors, {
  origin: true,
});

fastify.listen({ port: 3001 }).then(() => {
  console.log("Logged");
});

const aboutData = [
  {
    year: "1995-2008",
    title: "Early Passion for Technology",
    description:
      "From an early age, I became fascinated with computers and programming. Starting with basic HTML and CSS, I gradually expanded my skills to include JavaScript and various frameworks.",
    image: "images/about1.jpg",
  },
  {
    year: "2008-2014",
    title: "Higher Education and Career Growth",
    description:
      "During my university years, I studied computer science and gained hands-on experience through internships and freelance projects. This period fueled my passion for creating innovative solutions and solving complex problems.",
    image: "images/about2.jpg",
  },
  {
    year: "2014-Present",
    title: "Professional Excellence and Continuous Learning",
    description:
      "Throughout my career, I have consistently sought opportunities to refine my skills and stay updated with the latest technologies. I strive for excellence in every project I undertake and aim to deliver valuable and impactful results.",
    image: "images/about3.jpg",
  },
  {
    year: "Future",
    title: "Continuing to Make a Difference",
    description:
      "I am committed to leveraging my skills and expertise to contribute to meaningful projects that have a positive impact on society. I am eager to take on new challenges and collaborate with talented individuals to create innovative solutions.",
    image: "images/about4.jpg",
  },
];

const skillsData = [
  {
    icon: "fa-cart-shopping",
    skill: "Front-end Development",
    description:
      "Proficient in HTML, CSS, and JavaScript. Experienced in responsive web design, building user-friendly interfaces, and using modern frameworks like ReactJS.",
  },
  {
    icon: "fa-laptop",
    skill: "Back-end Development",
    description:
      "Skilled in server-side programming using technologies like Node.js and Express. Experience working with databases such as MongoDB and MySQL.",
  },
  {
    icon: "fa-mobile-screen-button",
    skill: "Mobile App Development",
    description:
      "Proficient in developing mobile apps for iOS and Android using frameworks like React Native. Experienced in building engaging and intuitive mobile user interfaces.",
  },
];

const cvData = {
  personalInfo: {
    profileImage: "images/profile.jpg",
    name: "James Anderson",
    email: " your.email@example.com",
    phone: "(123) 456-7890",
    address: "Your address",
  },
  technicalSkills: ["HTML", "CSS", "Javascript"],
  personalInterests: ["Interest 1", "Interest 2", "Interest 3"],
  profile:
    "Write a brief description of yourself, your background, and your goals. Highlight your key strengths and experiences. ",
  qualifications: ["Qualification 1", "Qualification 2", "Qualification 3"],
  eduction: {
    year: "Year - Year",
    institute: "University/Institution",
    degree: "Degree/Program",
  },
  coursesTraining: {
    year: "Year",
    course: "Course/Training",
    degree: "Institution/Organization",
  },
  workExperience: {
    year: "Year - Year",
    position: "Job Position",
    company: "Company/Organization",
  },
  extracurricularActivities: {
    organization: "Organization Name",
    role: "Role/Position",
    details: "Details of your involvement and contributions",
  },
};

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
const itemsPerPage = 4;

fastify.get("/portfolio", (request, reply) => {
  let {
    current_page = 1,
    page_size = itemsPerPage,
    searchTitle,
    selectedTechnologies = "",
    minPrice,
    maxPrice,
    sortBy,
  } = request.query;

  selectedTechnologies = selectedTechnologies.split(",");

  let filteredResult = [];
  filteredResult = portfolioList.filter((item) => {
    if (
      searchTitle &&
      !item.title.toLowerCase().includes(searchTitle.toLowerCase())
    ) {
      console.log("1");
      return false;
    }
    const commonTechnologies = item.technologies.filter((tech) =>
      selectedTechnologies.includes(tech)
    );
    if (selectedTechnologies.length !== commonTechnologies.length) {
      console.log("2");
      return false;
    }
    if (minPrice && item.price < parseInt(minPrice)) {
      console.log("3");
      return false;
    }
    if (maxPrice && item.price > parseInt(maxPrice)) {
      console.log("4");
      return false;
    }
    return true;
  });

  console.log("filteredResult", filteredResult);
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

fastify.get("/about", (request, reply) => {
  reply.send(aboutData);
});

fastify.get("/cv", (request, reply) => {
  reply.send(cvData);
});

fastify.get("/skills", (request, reply) => {
  reply.send(skillsData);
});
