const path = require("path");
const fs = require("fs");

//возщвращает данные из файла filename
function getData(fileName) {
  try {
    const filePath = path.join(__dirname, `../data/${fileName}.json`);
    const data = JSON.parse(fs.readFileSync(filePath));
    return data;
  } catch (e) {
    console.error(e);
  }
}

//записывает newdata в файл filename
function editData(fileName, newData) {
  try {
    const filePath = path.join(__dirname, `../data/${fileName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(newData));
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getData,
  editData,
};
