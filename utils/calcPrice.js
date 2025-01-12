const { getData } = require("../data/dataController");

const calcPrice = (obj) => {
  const shawaData = getData("shawa").shawa;

  const thatShawa = shawaData.map((el) => {
    if (el.name === obj.type) {
      return el.price;
    }
  });
  return thatShawa[0];

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

    console.log(arr)

  arr.map((el) => {
    totalPrice += el.price;
  });

  return totalPrice;
};

module.exports = {
  calcPrice,
  calcTotalPrice,
};
