const express = require("express");
const path = require("path");

const checkoutRouter = express.Router();

const { checkout, track } = require("../controllers/ordersController");

checkoutRouter.use(express.static(path.join(process.cwd(), "public")));

checkoutRouter.get("/tracker", (req, res) => {
  track(req, res)
});

checkoutRouter.use("/", (req, res) => {
  checkout(req, res);
});

module.exports = checkoutRouter;
