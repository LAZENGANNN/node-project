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

getAddsOptions();
