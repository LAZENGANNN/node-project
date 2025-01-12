const path = require("path");

const express = require("express");
const { getAllMenu, getOptions, getFiltedMenu, getAddresses } = require("../controllers/controller");

const menuRouter = express.Router();

menuRouter.get("/", (req,res)=>{
  getFiltedMenu(req, res)
})


//api
menuRouter.get("/get", (req, res) => {
  getAllMenu(req, res);
});

menuRouter.get("/adds", (req, res) => {
  getOptions(req, res);
});

menuRouter.get("/addresses",(req,res)=>{
  getAddresses(req, res)
})



module.exports = menuRouter;
