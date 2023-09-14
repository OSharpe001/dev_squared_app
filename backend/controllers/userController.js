const webToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// REGISTER A NEW USER (POST REQUEST - "/api/users")
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, userName, password } = req.body;

    if (!name || !userName || !email || !password) {
        res.status(400);
        throw new Error("Please complete all fields...");
    };

    // CHECK IF USER EXISTS
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("Prior account with this email...");
    };

    // CHECK IF ALIAS IS ALREADY IN USE
    const aliasExists = await User.findOne({userName});
    if (aliasExists) {
        res.status(400);
        throw new Error("Prior account uses this alias...");
    };

    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE NEW USER
    const user = await User.create({
        name,
        userName,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data...");
    };
});

// AUTHENTICATE A USER AT LOGIN (POST REQUEST - "/api/users/login")
const loginUser = asyncHandler(async (req, res) => {
    const { email, userName, password } = req.body;

    // CHECK FOR USER EMAIL OR USERNAME
    const userCheck1 = await User.findOne({ email });
    const userCheck2 = await User.findOne({ userName });

    if (userCheck1 && (await bcrypt.compare(password, userCheck1.password))) {
        res.json({
            _id: userCheck1.id,
            name: userCheck1.name,
            userName: userCheck1.userName,
            email: userCheck1.email,
            token: generateToken(userCheck1._id),
        });
    } else if (userCheck2 && (await bcrypt.compare(password, userCheck2.password))) {
        res.json({
            _id: userCheck2.id,
            name: userCheck2.name,
            userName: userCheck2.userName,
            email: userCheck2.email,
            token: generateToken(userCheck2._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials...");
    };
});

// GET USER DATA (GET REQUEST - "/api/users/me")
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// GENERATE WEBTOKEN
const generateToken = (id) => {
    return webToken.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
};

module.exports = { registerUser, loginUser, getMe };