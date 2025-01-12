const { getData, editData } = require("../data/dataController");
const { calcPrice, calcTotalPrice } = require("../utils/calcPrice");
const { checkAuth } = require("./usersController");

const addToCart = (req, res) => {
  const sessionData = req.session.data;
  const obj = req.body;

  if (sessionData.isAuth === true) {
    let users = getData("users");

    const cartItem = {
      ...obj,
      price: calcPrice(obj),
    };

    users.map((el) => {
      if (el.login === sessionData.currentUser.login) {
        el.cart.push(cartItem);
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

  if (checkAuth(req)) {
    const user = users.find((el) => el.login === sessionData.currentUser.login);

    const objToRender = {
      login: user.login,
      email: user.email,
      cart: user.cart,
      totalPrice: calcTotalPrice(user.cart),
    };
    res.render("pages/checkOutPage.hbs", objToRender);
  } else {
    const objToRender = {
      login: `не авторизирован`,
      email: `не авторизирован`,
      cart: sessionData.currentUser.cart,
      totalPrice: calcTotalPrice(sessionData.currentUser.cart),
    };
    res.render("pages/checkOutPage.hbs", objToRender);
  }
};

const acceptOrder = (req, res) => {
  if (checkAuth(req)) {
    const orders = getData("orders");
    orders.push(req.body);
    editData("orders", orders);

    //обнуление корзины и обновление истории заказов
    const usersData = getData("users");
    const newUsersData = usersData.map((el) => {
      if (el.login === req.session.data.currentUser.login) {
        el.story.push(...el.cart);
        el.cart = [];
        return el;
      } else {
        return el;
      }
    });
    editData("users", newUsersData);

    const id = req.body.id;
    res.send(`http://localhost:7777/checkout/tracker?id=${id}`);
  } else {
    res.send(`Авторизируйтесь чтобы сделать заказ`);
  }
};

const track = (req, res) => {
  const sessionData = req.session.data;
  const user = getData("users").find(
    (el) => el.login === sessionData.currentUser.login
  );

  const order = getData("orders").find((el) => String(el.id) === req.query.id);

  console.log(order);

  const objToRender = {
    id: order.id,
    cart: order.cart,
    totalPrice: calcTotalPrice(order.cart),
    link: `http://localhost:7777/checkout/tracker?id=${order.id}`,
  };

  res.render("pages/trackPage.hbs", objToRender);
};

module.exports = {
  addToCart,
  checkout,
  acceptOrder,
  track,
};
