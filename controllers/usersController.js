const { getData, editData } = require("../data/dataController");

const path = require("path");
const fs = require("fs");
const { sendRegisterMail } = require("../utils/mails");
const { getRandomInt } = require("../utils/randomtron");

const checkAuth = (req, res) => {
  console.log(req.session.data);
  if (req.session.data.isAuth) {
    return true;
  } else {
    return false;
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
    const userBool =
      el.login === userData.login && el.password === userData.password;
    return userBool === true;
  });
  const user = a[0];
  if (a.length != 1) {
    res.send('<h1 style="color: red;">пользователь не найден</h1>');
  } else {
    req.session.data.isAuth = true;
    req.session.data.currentUser.login = user.login;
    console.log(req.session.data);

    //синхронизация корзины пользователя и корзины из сессии
    const newUsersData = data.map((el) => {
      if (el.login === user.login) {
        const sessionCart = req.session.data.currentUser.cart
        el.cart.push(...sessionCart);
        req.session.data.currentUser.cart = el.cart;
        return el;
      }
      return el;
    });

    editData("users", newUsersData);

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

  res.render("pages/profile/userPage.hbs", currentUserArr[0]);
};

const logOut = (req, res) => {
  const sessionData = req.session.data;
  sessionData.isAuth = false;
  sessionData.currentUser = { login: null, cart: [] };

  res.send("вы вышли из профиля");
};

const getCart = (req, res) => {
  if (checkAuth(req)) {
    const data = getData("users");

    const AuthedLogin = req.body.login;

    const currentUserArr = data.filter((el) => {
      const user = el.login === AuthedLogin;
      return user === true;
    });

    const cart = currentUserArr[0].cart;

    res.send(JSON.stringify(cart));
  } else {
    const sessionData = req.session.data;

    const cart = sessionData.currentUser.cart;

    res.send(JSON.stringify(cart));
  }
};

module.exports = {
  register1,
  auth,
  register2,
  checkAuth,
  fastAuth,
  logOut,
  getCart,
};
