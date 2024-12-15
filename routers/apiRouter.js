const express = require("express");
const menuRouter = require("./menuRouter");
const orderRouter = require("./orderRouter");

const apiRouter = express.Router();



apiRouter.use("/menu/", menuRouter)

apiRouter.use("/order/", orderRouter)

module.exports = apiRouter;