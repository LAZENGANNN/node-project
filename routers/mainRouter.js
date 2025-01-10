const express = require("express");
const apiRouter = require("./apiRouter");
const menuRouter = require("./menuRouter");
const orderRouter = require("./orderRouter");
const userRouter = require("./userRouter");
const checkoutRouter = require("./checkoutRouter");

const mainRouter = express.Router();

mainRouter.use("/api/", apiRouter);

mainRouter.get("/map", (req, res) => {
  res.render("pages/mapPage.hbs");
});

mainRouter.use("/menu", menuRouter);

mainRouter.use("/order", orderRouter);

mainRouter.use("/user", userRouter);

mainRouter.use("/checkout", checkoutRouter)



module.exports = mainRouter;
