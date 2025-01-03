const { getData, editData } = require("../data/dataController");

const path = require("path");
const fs = require("fs");
const { sendRegisterMail } = require("../utils/mails");
const { getRandomInt } = require("../utils/randomtron");

const checkAuth = (req, res) => {
  console.log(req.session.data);
  if (req.session.data.isAuth) {
    res.redirect("http://localhost:7777/user/general");
  } else {
    res.redirect("http://localhost:7777/user/register");
  }
};

const register1 = (req, res, userData) => {
  const password = userData.password;

  if (password === userData.password2) {
    const user = {
      login: userData.login,
      password: userData.password,
      email: userData.email,
      cart: [],
      story: [],
    };

    const code = getRandomInt(999999);

    sendRegisterMail(userData.email, code);

    req.session.data = { regCode: code, user };

    res.render("pages/checkCodePage.hbs");
  } else {
    res.send("ERROR");
  }
};

const register2 = (req, res, userData) => {
  const emailCode = req.session.data.regCode;

  if (emailCode === Number(userData.code)) {
    let data = getData("users");
    const user = req.session.data.user;
    data.push(user);
    editData("users", data);

    res.send(`регистрация успешна<br><a href="/">на главную</a>`);
  } else {
    res.send(`неверный код`);
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
    req.session.data.isAuth = true;
    req.session.data.currentUser.login = a[0].login;
    console.log(req.session.data);

    res.redirect("http://localhost:7777/user/general");
  }
};

const fastAuth = (req, res) => {
  const data = getData("users");

  const sessionData = req.session.data;
  const AuthedLogin = sessionData.currentUser.login;

  const currentUserArr = data.filter((el) => {
    const user = el.login === AuthedLogin;
    return user === true;
  });

  res.render("pages/userPage.hbs", currentUserArr[0]);
};

module.exports = {
  register1,
  auth,
  register2,
  checkAuth,
  fastAuth,
};
