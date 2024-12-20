const express = require("express");
const menuRouter = require("./menuRouter");
const orderRouter = require("./orderRouter");
const userRouter = require("./userRouter");

const apiRouter = express.Router();

apiRouter.use("/menu/", menuRouter);

apiRouter.use("/order/", orderRouter);

apiRouter.use("/user/", userRouter);

module.exports = apiRouter;
