const asyncHandler = require("../utils/asynchandler");
const jwt = require("jsonwebtoken");

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.session;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized", resdata: null });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", resdata: null });
    }
});

module.exports = { verifyToken };