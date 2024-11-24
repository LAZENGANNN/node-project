const { renderData, renderData2 } = require("../utils/dataRenderer");
const { getData } = require("./dataController");

const fs = require("fs");
const path = require("path");

const getAllMenu = (req, res) => {
  const cardTemplate = fs.readFileSync(
    path.join(__dirname, "../templates/card.html"),
    "utf-8"
  );
  const pageTemplate = fs.readFileSync(
    path.join(__dirname, "../templates/productPage.html"),
    "utf-8"
  );

  let data = getData("menu");

  let newData = [];

  data.map((el) => {
    newData.push(renderData(el, cardTemplate));
  });

  const html = pageTemplate.replace("{{content}}", newData.join(""));

  res.send(html);
};

module.exports = {
  getAllMenu,
};
