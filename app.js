const express = require("express");
const path = require("path");
const mainRouter = require("./routers/mainRouter");
const hbs = require("hbs");

require("dotenv").config();

const port = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("pages/homePage.hbs");
});

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use("/", mainRouter);

app.get("/map", (req, res) => {
  res.render("pages/mapPage.hbs");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

//ПИСЬМА

// Для получения кода:
// -> google (профиль)
// -> security (безопаность)
// -> 2-Step Verification (2-этапная авторизация)
// -> App passwords (пароли приложений)

// Первые полторы минуты https://www.youtube.com/watch?v=74QQfPrk4vE
// Либо ещё https://www.getmailbird.com/gmail-app-password/
// https://support.google.com/mail/answer/185833?hl=en
