const Portfolio = require("../models/Portfolio");
const getAllPortfolios = (request, reply) => {
  let {
    current_page = 1,
    page_size = 4,
    searchTitle = "",
    selectedTechnologies = "",
    minPrice = 0,
    maxPrice = 100,
    sortBy,
  } = request.query;

  const query = Portfolio.find();

  if (searchTitle) {
    query.where("title", { $regex: RegExp(searchTitle, "i") });
  }
  if (selectedTechnologies) {
    const technologiesArray = selectedTechnologies
      .split(",")
      .map((tech) => tech.trim());
    query.where("technologies").all(technologiesArray);
  }
  if (minPrice) {
    query.where("price").gte(parseInt(minPrice));
  }
  if (maxPrice) {
    query.where("price").lte(parseInt(maxPrice));
  }
  if (sortBy === "lowToHigh") {
    query.sort({ price: 1 });
  } else if (sortBy === "highToLow") {
    query.sort({ price: -1 });
  }
  query
    .exec()
    .then((data) => {
      const startIndex = (current_page - 1) * page_size;
      const endIndex = startIndex + parseInt(page_size);
      const paginatedData = data.slice(startIndex, endIndex);

      reply.send({
        data: paginatedData,
        paginate: {
          current_page: parseInt(current_page),
          total_page: Math.ceil(data.length / page_size),
          page_size: parseInt(page_size),
        },
      });
    })
    .catch((error) => {
      console.log("Error retrieving portfolios:", error);
      reply.status(500).send({ error: "Internal server error" });
    });
};

module.exports = { getAllPortfolios };
