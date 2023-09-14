const webToken = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // TAKE TOKEN FROM THE HEADER
            token = req.headers.authorization.split(" ")[1];

            // VERIFY THE TOKEN
            const decoded = webToken.verify(token, process.env.JWT_SECRET);

            // GET USER FROM TOKEN
            req. user = await User.findById(decoded.id).select("-password");

            next();
        } catch (err) {
            console.log("LATEST ERROR FROM AUTHMIDDLEWARE: ", err);
            res.status(401);
            throw new Error("Not Authorized...");
        };
    };

    if (!token) {
        res.status(401);
        throw new Error("Not Authorized...");
    };
});

module.exports = { protect };