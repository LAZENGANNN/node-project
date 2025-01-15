const path = require("path");

const express = require("express");
const { addToCart, acceptOrder, getTime } = require("../controllers/ordersController");

const orderRouter = express.Router();

const bodyParser = require("body-parser");
orderRouter.use(bodyParser.urlencoded({ extended: false }));
orderRouter.use(bodyParser.json());

orderRouter.use(express.static(path.join(process.cwd(), "public")));

orderRouter.get("/", (req, res) => {
  res.render("pages/orderPage.hbs");
});

orderRouter.get("/confirm", (req, res) => {
  res.render("pages/confirmOrderPage.hbs");
});


//api

orderRouter.post("/add", (req, res) => {
  addToCart(req, res);
});

orderRouter.post("/create", (req, res) => {
  acceptOrder(req, res);
});

orderRouter.post("/time", (req, res)=>{
  getTime(req, res)
})

module.exports = orderRouter;
