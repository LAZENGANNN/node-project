async function queryFilters() {
  const maxPrice = maxPriceInp.value;
  const minPrice = minPriceInp.value;

  const obj = {
    minPrice,
    maxPrice,
  };

  //   window.location = `/menu?filters=true&minPrice=${minPrice}&maxPrice=${maxPrice}`;

  let loc = `/menu?filters=true&`;
  for (key in obj) {
    if (key) {
      loc += `${key}=${obj[key]}&`;
    }
  }

  loc = loc.slice(0, loc.length - 1);

  window.location = loc;

  console.log("c")

}
const query = new URLSearchParams(window.location.search);
if (query.has("maxPrice")) maxPriceInp.value = query.get("maxPrice");
if (query.has("minPrice")) minPriceInp.value = query.get("minPrice");

applyButton.addEventListener("click", () => {
  queryFilters();


});

cleanButton.addEventListener("click", () => {
  window.location = "/menu";
});
