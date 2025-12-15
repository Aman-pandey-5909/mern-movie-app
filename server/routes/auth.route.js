const Router = require("express").Router();
const validatezod = require("../middlewares/validatezod");
const { signupSchema, loginSchema } = require("../schemas/auth");
const { verifyToken } = require("../middlewares/verifytoken");

const {
  signup,
  login,
  adminLogin,
  getuser,
  logout
} = require("../controllers/auth.controller");

//normal user
Router.post("/signup", validatezod(signupSchema), signup);
Router.post("/login", validatezod(loginSchema), login);
Router.post("/getuser", verifyToken, getuser);
Router.post("/logout", verifyToken, logout);
//admin
Router.post("/adminlogin", validatezod(loginSchema), adminLogin);

module.exports = Router;
