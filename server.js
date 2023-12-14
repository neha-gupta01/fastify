const fastify = require("fastify")();
const cors = require("@fastify/cors");


fastify.register(cors, {
  // put your options here
  origin:true
});

fastify.get("/", (req, reply) => {
  reply.send({ hello: "world" });
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

  fastify.get("/about", (request, reply) => {
	reply.send(aboutData);
  });