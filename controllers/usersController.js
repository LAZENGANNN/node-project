const { getData, editData } = require("../data/dataController");

const path = require("path");
const fs = require("fs");

const addUser = (req, res, userData) => {
  let data = getData("users");

  const password = userData.password;

  if (password === userData.password2) {
    data.push(userData);
    console.log(data);

    editData("users", data);
    res.send(`регистрация успешна<br><a href="/">на главную</a>`);
  } else {
    res.send("ERROR");
  }
};

const auth = (req, res, userData) => {
  const data = getData("users");

  const a = data.filter((el) => {
    const user =
      el.login === userData.login && el.password === userData.password;
    return user === true;
  });
  if (a.length != 1) {
    res.send('<h1 style="color: red;">пользователь не найден</h1>');
  } else {



    res.render("pages/userPage.hbs", a[0]);
  }
};

module.exports = {
  addUser,
  auth,
};
