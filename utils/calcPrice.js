const { getData } = require("../data/dataController");

//обе функции сятают цену

const calcPrice = (obj) => {
  const shawaData = getData("shawa").shawa;

  const thatShawa = shawaData.find((el) => {
   return el.name === obj.type;
  });

  return thatShawa.price;

  //если добавки  и соусы платные:

  //   for (key in obj) {
  //     console.log(key, obj[key]);

  //     const item_priceObj = {
  //       key:
  //     }
  //   }
};

const calcTotalPrice = (arr) => {
  let totalPrice = 0;

  console.log(arr);

  arr.map((el) => {
    totalPrice += el.price;
  });

  return totalPrice;
};

module.exports = {
  calcPrice,
  calcTotalPrice,
};
