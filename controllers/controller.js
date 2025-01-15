const { getData } = require("../data/dataController");


//отправляет меню на сервер
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

//возвращает меню с фильтрами
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

  res.render("pages/menuPage.hbs", objToRender);
};

//отпраляет соусы и добавки
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

//отпраляет адреса 
const getAddresses = (req, res) => {
  const adds = getData("adresses");

  res.send(JSON.stringify(adds));
};

module.exports = {
  getAllMenu,
  getOptions,
  getFiltedMenu,
  getAddresses,
};
