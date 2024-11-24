const express = require("express");
const path = require("path");
const MenuRouter = require("./routers/router");
const { getAllMenu } = require("./controller/controller");

const server = express();

server.use(express.static(path.join(__dirname, "public")));

server.get("/", (req, res) => {
  res.sendFile("index.html");
});


// server.get("/menu/", MenuRouter);

server.get("/api/menu/all", (req, res)=>{
    getAllMenu(req, res)
});

server.use((req, res) => {
  res.send(`<h1 style="color: red;">NOT FOUND</h1>`);
});
const port = 7777;
server.listen(port, () => {
  console.log(`port: ${port}`);
});
