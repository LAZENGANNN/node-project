const { getData, editData } = require("../data/dataController");
const { calcPrice, calcTotalPrice } = require("../utils/calcPrice");
const { checkAuth } = require("./usersController");


//добавляет товар в кроизину
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
    res.send(
      `товар ${obj.type} добавлен в корзину. для сохранения корзины авторизируйтесь`
    );
  }
};


//рендерит страницу заказа (checkoutPage)
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

//принимает заказ от клиента
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


//отслеживает статус заказа и рендерит нужную страницу
const track = (req, res) => {

  let order = getData("orders").find((el) => String(el.id) === req.query.id);

  console.log(order.status)

  const objToRender = {
    id: order.id,
    cart: order.cart,
    totalPrice: calcTotalPrice(order.cart),
    link: `http://localhost:7777/checkout/tracker?id=${order.id}`,
    status: order.status,
  };

  //отсчёт готовности
  if (!order.isTimerWorks) {
    let timerId = setTimeout(function tick() {
      //скрипт который должен повторится
      order.time -= 1;

      const newData = getData("orders").map((el) => {
        if (el.id === order.id) {
          el.time -= 1;
          el.isTimerWorks = true;
          order = el
          return el;
        } else {
          return el;
        }
      });

      editData("orders", newData);

      console.log(order.time);

      //повтор
      if (order.time >= 1) {
        timerId = setTimeout(tick, 1000);
      } else {
        timerId = null;
      }
    }, 1000);
  }

  res.render("pages/trackPage.hbs", objToRender);
};


//посылает на сервер отасвшееся время до готовности заказа
const getTime = (req, res) => {
  const queryPart = req.body.a;

  const orderId = queryPart.slice(-6);

  console.log(queryPart, orderId);

  const order = getData("orders").find((el) => String(el.id) === orderId);

  const toSend = order.time;

  if(order.time <= 0){
    res.send(`заказ готов`)
  }
  // else if(order.status === `готов`){
  //   res.send(`заказ готов`)
  // } 
  else {
    res.send(`${toSend}`);
  }

  
};

module.exports = {
  addToCart,
  checkout,
  acceptOrder,
  track,
  getTime,
};
