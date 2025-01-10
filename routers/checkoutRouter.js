const express = require("express");
const path = require("path");

const checkoutRouter = express.Router();

const { checkout } = require("../controllers/ordersController");

checkoutRouter.use(express.static(path.join(process.cwd(), "public")));

checkoutRouter.get("/tracker", (req, res) => {
  res.render("pages/trackPage.hbs");
});

checkoutRouter.use("/", (req, res) => {
  checkout(req, res);
});

module.exports = checkoutRouter;
