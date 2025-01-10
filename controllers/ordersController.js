const { getData, editData } = require("../data/dataController");

const addToCart = (req, res) => {
  const sessionData = req.session.data;
  const obj = req.body;

  if (sessionData.isAuth === true) {
    let users = getData("users");

    users.map((el) => {
      if (el.login === sessionData.currentUser.login) {
        el.cart.push(obj);
        return el;
      } else {
        return el;
      }
    });

    editData("users", users);

    res.send(
      `товар ${obj.type} добвален в корзину пользователя ${sessionData.currentUser.login}`
    );
  } else {
    sessionData.currentUser.cart.push(obj);
    console.log(sessionData.currentUser.cart);
    res.send(
      `товар ${obj.type} добавлен в корзину. для сохранения корзины авторизируйтесь`
    );
  }
};

const checkout = (req, res) => {
  let users = getData("users");
  const sessionData = req.session.data;

  if (sessionData.isAuth === true) {
    const user = users.find((el) => el.login === sessionData.currentUser.login);

    console.log(user);

    const objToRender = {
      login: user.login,
      email: user.email,
      cart: user.cart,
    };
    res.render("pages/checkOutPage.hbs", objToRender);
  }
};

const acceptOrder = (req, res) => {
  const orders = getData("orders");

  orders.push(req.body);

  editData("orders", orders);

  res.send("http://localhost:7777/checkout/tracker");
};

module.exports = {
  addToCart,
  checkout,
  acceptOrder,
};
