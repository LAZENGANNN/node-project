const { getData, editData } = require("../data/dataController");
const { checkAuth } = require("./usersController");

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

  if (checkAuth(req)) {
    const user = users.find((el) => el.login === sessionData.currentUser.login);

    const objToRender = {
      login: user.login,
      email: user.email,
      cart: user.cart,
    };
    res.render("pages/checkOutPage.hbs", objToRender);
  }else{
    const objToRender = {
      login: `не авторизирован`,
      email: `не авторизирован`,
      cart: sessionData.currentUser.cart,
    };
    res.render("pages/checkOutPage.hbs", objToRender);
  }
};

const acceptOrder = (req, res) => {
  if (checkAuth(req)) {
    const orders = getData("orders");

    orders.push(req.body);

    editData("orders", orders);

    const id = req.body.id;
    res.send(`http://localhost:7777/checkout/tracker?id=${id}`);
  }else{
    res.send(`Авторизируйтесь чтобы сделать заказ`)
  }
};

const track = (req, res) => {
  const sessionData = req.session.data;
  const user = getData("users").find(
    (el) => el.login === sessionData.currentUser.login
  );

  console.log(getData("orders"));

  const order = getData("orders").find((el) => String(el.id) === req.query.id);
  console.log(req.query.id);

  console.log(order);

  const objToRender = {
    id: order.id,
    cart: user.cart,
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
