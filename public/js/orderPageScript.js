
//дообавляет option в select
async function getAddsOptions() {
  const response = await fetch("/api/menu/adds", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let adds = await response.json();

  //добавки
  const add = adds[0].options;
  add.map((el) => {
    const option = document.createElement("option");
    option.setAttribute("value", el.name);
    option.innerText = el.name;

    addsSelect.append(option);
  });

  //соусы
  const sauses = adds[1].options;
  sauses.map((el) => {
    const option = document.createElement("option");
    option.setAttribute("value", el.name);
    option.innerText = el.name;

    sauseSelect.append(option);
  });

  //шаурма
  const names = adds[2];
  names.map((el) => {
    const option = document.createElement("option");
    option.setAttribute("value", el);
    option.innerText = el;

    shawaTypeSelect.append(option);
  });
}

//отпраляет запрос в коризину
async function sendPOSTtoCart() {
  const sendData = {
    type: shawaTypeSelect.value,
    adds: addsSelect.value,
    sause: sauseSelect.value,
  };

  const response = await fetch("/api/order/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });

  let responseText = await response.text();

  alert(responseText);
}

//добваляет в select адреса
if (document.getElementById("adressSelect")) {
  console.log(document.getElementById("adressSelect"));
  async function getAddressesS() {
    const response = await fetch("/api/menu/addresses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let adds = await response.json();

    adds.map((el) => {
      const option = document.createElement("option");
      option.setAttribute("value", el);
      option.innerText = el;

      adressSelect.append(option);
    });
  }
  getAddressesS();
}

//формирует и отпраляет запрос с заказом
async function sendOrder() {
  const response1 = await fetch("/api/user/getCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: loginInp.value }),
  });

  let cart = await response1.json();

  if (cart.length === 0) {
    alert("сначала добввьте товары в корзину");
    return;
  }

  const order = {
    id: Math.floor(Math.random() * 999999),
    user: {
      login: loginInp.value,
      email: emailInp.value,
    },
    time: 15 * 60,
    //мин*сек
    adress: adressSelect.value,
    cart: cart,
    isTimerWorks: false,
    status: "готовится",
  };

  console.log(cart);

  console.log(order);

  const response2 = await fetch("/api/order/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  let loc = await response2.text();

  if (loc.includes("localhost")) {
    window.location = loc;
  } else {
    alert(loc, "||с сервера пришёл неверный адрес||");
  }
}

if (sendOrderButton) {
  sendOrderButton.addEventListener("click", () => {
    sendOrder();
  });
}

if (orderFormButton) {
  orderFormButton.addEventListener("click", () => {
    sendPOSTtoCart();
  });
}

getAddsOptions();
