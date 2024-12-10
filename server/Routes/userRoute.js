const express=require("express")
const { HandleSignup, HandleLogin } = require("../controller/UserController")
const { ValidateSignup, ValidateLogin } = require("../middleware/Validation")

const userRoute= express.Router()

userRoute.post("/signup",ValidateSignup,HandleSignup)
userRoute.post("/login",ValidateLogin,HandleLogin)


module.exports=userRoute