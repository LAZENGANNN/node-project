const express = require("express");
const path = require("path");
const mainRouter = require("./routers/mainRouter");
const hbs = require("hbs");
const crypto = require("crypto");
const session = require("express-session");

require("dotenv").config();

const port = process.env.PORT;
const app = express();

app.use(
  session({
    secret: crypto.randomBytes(32).toString("hex"),
    resave: true,
    saveUninitialized: true,
  })
)

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("pages/homePage.hbs");
});

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
