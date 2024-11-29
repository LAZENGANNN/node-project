const path = require("path");
const fs = require("fs")



function getData(fileName) {
    try {
      const filePath = path.join(__dirname, `../data/${fileName}.json`);
      console.log(filePath)
      const data = JSON.parse(fs.readFileSync(filePath));
      return data;
    } catch (e) {
      console.error(e);
    }
  }



  module.exports ={
    getData,
  }