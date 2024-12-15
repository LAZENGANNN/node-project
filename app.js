const express = require("express");
const path = require("path");
const mainRouter = require("./routers/mainRouter");
const hbs = require('hbs');

const port = 7777;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).sendFile(`index.html`);
});

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/partials');

app.use("/", mainRouter);

app.get("/map", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/html/mapPage.html"));
});

app.listen(7777, () => {
  console.log(`http://localhost:${port}`);
});
