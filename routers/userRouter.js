const path = require("path");

const express = require("express");
const urlencodedParser = express.urlencoded({extended: false});

const userRouter = express.Router();


// userRouter.get("/", (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, "../public/html/orderPage.html"));
// });

userRouter.use(express.static(path.join(process.cwd(), "public")));



userRouter.get("/register", (req, res) => {
    console.log(path.join(process.cwd(), "public"))

  res.render("registerPage.hbs")
});


//api
userRouter.post("/create", urlencodedParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.send(`${req.body.login}`);
})


module.exports = userRouter;
