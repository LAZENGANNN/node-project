const path = require("path");

const express = require("express");
const {
  register1,
  auth,
  register2,
  checkAuth,
  fastAuth,
  logOut,
  getCart,
} = require("../controllers/usersController");
const urlencodedParser = express.urlencoded({ extended: false });

const userRouter = express.Router();

const bodyParser = require("body-parser");
userRouter.use(bodyParser.urlencoded({ extended: false }));
userRouter.use(bodyParser.json());

userRouter.use(express.static(path.join(process.cwd(), "public")));

userRouter.get("/checkAuth", (req, res) => {
  checkAuth(req, res);
});

userRouter.get("/register", (req, res) => {
  // console.log(path.join(process.cwd(), "public"));
  res.render("pages/registerPage.hbs");
});

userRouter.get("/general", (req, res) => {
  fastAuth(req, res);
});

//api
userRouter.post("/create", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  register1(req, res, req.body);
});

userRouter.post("/auth", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  auth(req, res, req.body);
});

userRouter.post("/code", urlencodedParser, (req, res) => {
  register2(req, res, req.body);
});

userRouter.get("/logOut", (req, res) => {
  logOut(req, res);
});

userRouter.post("/getCart", (req, res) => {
  getCart(req, res);
});

module.exports = userRouter;
