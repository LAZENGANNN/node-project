const express = require("express");
const apiRouter = require("./apiRouter");
const menuRouter = require("./menuRouter");
const orderRouter = require("./orderRouter");

const mainRouter = express.Router();

mainRouter.use("/api/", apiRouter);

mainRouter.use("/menu", menuRouter);

mainRouter.use("/order", orderRouter)

module.exports = mainRouter;
