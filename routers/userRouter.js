const path = require("path");

const express = require("express");
const { addUser, auth } = require("../controllers/usersController");
const urlencodedParser = express.urlencoded({extended: false});

const userRouter = express.Router();


// userRouter.get("/", (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, "../public/html/orderPage.html"));
// });

userRouter.use(express.static(path.join(process.cwd(), "public")));



userRouter.get("/register", (req, res) => {
    console.log(path.join(process.cwd(), "public"))

  res.render("pages/registerPage.hbs")
});


//api
userRouter.post("/create", urlencodedParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);
    addUser(req, res, req.body)  
})

userRouter.post("/auth", urlencodedParser, (req, res)=>{
  if(!req.body) return res.sendStatus(400);
  auth(req, res, req.body)  
})

userRouter.get("/general", (req, res)=>{

})


module.exports = userRouter;
