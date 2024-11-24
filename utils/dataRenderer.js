// const renderData = function (obj, template) {
//   for (const key in obj) {
//     console.log(key);
//   }

//   const rendered = template.replace("{{price}}", obj.price);
//   return rendered;
// };

//   const flattenObject = (obj) => {
//     const result = {};
//     for (const key in obj) {
//       if (obj.hasOwnProperty(key) && obj[key].length > 0) {
//         result[key] = obj[key][0];
//       }
//     }
//     return result;
//   };

const renderData = function (obj, template) {
  let rendered = "";

  for (const key in obj) {
    rendered += template.replace(`{{${key}}}`, obj[key]);
  }

  return rendered;
};

module.exports = {
  renderData,
};
