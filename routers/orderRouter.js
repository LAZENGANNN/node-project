const path = require("path");

const express = require("express");

const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
  res.render("pages/orderPage.hbs")
});

orderRouter.post("/create", (req, res) => {
  res.send(`<h1> added </h1>`);
});

module.exports = orderRouter;
