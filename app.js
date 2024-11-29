const express = require("express");
const path = require("path");
const router = require("./routers/router");

const port = 7777;
const app = express();



app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.status(200).sendFile(`index.html`)
});


app.use("/api/menu/", router)


app.listen(7777, () => {
  console.log(`http://localhost:${port}`);
});