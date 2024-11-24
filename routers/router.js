const express = require("express");
const controlller = require("../controller/controller");

const MenuRouter = express.Router();

MenuRouter.get("/all", controlller.getAllMenu);

module.exports = MenuRouter;
