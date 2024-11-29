const express = require("express");
const { getAllMenu } = require("../controllers/controller");

const router = express.Router();

router.get("/get", (req, res) => {
  getAllMenu(req, res);
});

module.exports = router;
