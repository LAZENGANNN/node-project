const { getData } = require("../data/dataController");

const path = require("path");
const fs = require("fs");

const getAllMenu = (req, res) => {
  const menu = getData("shawa").shawa;

  const objToRender = {
    shawa: [
      /*объекты*/
    ],
  };

  menu.map((el) => {
    obj = {
      name: el.name,
      description: el.descriptions[0].text,
      price: el.decimalPrice,
      photo: `GK_shawa.png`,
    };

    objToRender.shawa.push(obj);
  });

  res.render("card.hbs", objToRender);
};

const getFiltedMenu = (req, res) => {
  const menu = getData("shawa").shawa;

  const objToRender = {
    shawa: [
      /*объекты*/
    ],
  };

  menu.map((el) => {
    obj = {
      name: el.name,
      description: el.descriptions[0].text,
      price: el.decimalPrice,
      photo: `GK_shawa.png`,
    };

    if (req.query.filters === "true") {
      const minPrice = Number(req.query.minPrice);
      const maxPrice = Number(req.query.maxPrice);
      const price = Number(obj.price);

      if (price >= minPrice && price <= maxPrice) {
        objToRender.shawa.push(obj);
      }
    } else {
      objToRender.shawa.push(obj);
    }
  });

  res.render("menuPage.hbs", objToRender);
};

const getOptions = (req, res) => {
  const menu = getData("shawa").shawa;

  const opts = [];
  opts.push(...menu[0].optionsGroups);

  const names = [];

  menu.map((el) => {
    names.push(el.name);
  });

  opts.push(names);

  res.send(JSON.stringify(opts));
};

const getShawaNames = () => {
  const menu = getData("shawa").shawa;

  const names = [];

  menu.map((el) => {
    names.push(el.name);
  });

  res.send(names);
};

const createUser  = (req, res) =>{
  



}

module.exports = {
  getAllMenu,
  getOptions,
  getFiltedMenu,
};
