const { getData } = require("../data/dataController");

const getAllMenu = (req, res) => {
  const menu = getData("shawa");

  res.status(200).send(`<p>${JSON.stringify(menu)}</p>`);
};

module.exports = {
  getAllMenu,
};
