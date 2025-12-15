const asyncHandler = require("../utils/asynchandler");
const User = require("../models/User");

const verifyRole = asyncHandler(async (req, res, next) => {
    // const { id } = req.user;
    // const userExists = await User.findById(id);
    // if (userExists.role !== "admin") {
    //     throw new Error(`Not Found - ${req.originalUrl}`);
    // }
    // next();
    const { role } = req.user;
    if (role !== "admin") {
        return res.status(403).json({ message: "Forbidden", resdata: null });
        // throw new Error(`Not Found - ${req.originalUrl}`);
    }
    next();
});

module.exports = { verifyRole };