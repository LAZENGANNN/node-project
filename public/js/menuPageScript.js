// async function getAll() {
//   const response = await fetch("/api/menu/get", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   let responseText = await response.text();

//   resultDiv.innerHTML = responseText;
// }

// getAll();

async function queryFilters() {
  window.location = "/menu";

  const maxPrice = maxPriceInp.value;
  const minPrice = minPriceInp.value;

  const obj = {
    minPrice,
    maxPrice,
  };

  //   window.location = `/menu?filters=true&minPrice=${minPrice}&maxPrice=${maxPrice}`;

  let loc = `/menu?filters=true&`;
  console.log(obj);
  for (key in obj) {
    if (key) {
      loc += `${key}=${obj[key]}&`;
    }
  }

  loc = loc.slice(0, loc.length - 1);

  window.location = loc;
}

applyButton.addEventListener("click", () => {
  queryFilters();
});

cleanButton.addEventListener("click", () => {
  window.location = "/menu";
});
