const asyncHandler = require("../utils/asynchandler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = asyncHandler(async (req, res) => {
  const userExists = await User.exists({ email: req.body.email });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User already exists", resdata: null });
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  await User.create(req.body);
  return res.status(200).json({ message: "Signup successful", resdata: null });
});

const login = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists) {
    return res
      .status(400)
      .json({ message: "User does not exist", resdata: null });
  }
  const isMatch = await bcrypt.compare(req.body.password, userExists.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Invalid credentials", resdata: null });
  }
  const token = jwt.sign({ id: userExists._id, role: userExists.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("session", token, { httpOnly: true, sameSite: "none", secure: true });
  return res
    .status(200)
    .json({
      message: "Login successful",
      resdata: { name: userExists.name, email: userExists.email, role: userExists.role },
    });
});

const adminLogin = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists || userExists.role !== "admin") {
    return res
      .status(400)
      .json({ message: "User does not exist", resdata: null });
  }
  const isMatch = await bcrypt.compare(req.body.password, userExists.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Invalid credentials", resdata: null });
  }
  const token = jwt.sign({ id: userExists._id, role: userExists.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("session", token, { httpOnly: true, sameSite: "none", secure: true });
  return res
    .status(200)
    .json({ message: "Admin Login successful", resdata: { name: userExists.name, email: userExists.email, role: userExists.role } });
});

const getuser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const userExists = await User.findById(id);
  return res
    .status(200)
    .json({ message: "Get User successful", resdata: { name: userExists.name, email: userExists.email, role: userExists.role } });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("session");
  return res
    .status(200)
    .json({ message: "Logout successful", resdata: null });
});

module.exports = { signup, login, adminLogin, getuser, logout };
