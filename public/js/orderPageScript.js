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

async function getUserData() {
  const response = await fetch("/api/user/getCart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let cart = await response.json();
}

//адреса
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

async function sendOrder() {
  const response1 = await fetch("/api/user/getCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: loginInp.value }),
  });

  let cart = await response1.json();

  const order = {
    id: Math.floor(Math.random() * 999999),
    user: {
      login: loginInp.value,
      email: emailInp.value,
    },
    data: new Date(),
    adress: adressSelect.value,
    cart: cart,
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

  if(loc.includes("localhost")){
    window.location = loc;
  }else{
    alert(loc)
  }
  
}

if (sendOrderButton) {
  sendOrderButton.addEventListener("click", () => {
    sendOrder();
  });
}

orderFormButton.addEventListener("click", () => {
  sendPOSTtoCart();
});

getAddsOptions();
