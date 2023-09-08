const asyncHandler = require("express-async-handler");
const Like = require("../models/likesModel");


// GET LIKES (GET REQUEST - "/api/likes")
const getLikes = asyncHandler(async (req, res) => {
    const likes = await Like.find({ user: req.user.id });
    res.status(200).json(likes);
});

// SET LIKES (POST REQUEST - "/api/likes")
const setLikes = asyncHandler(async (req, res) => {
    if (!req.body.like) {
        res.status(400);
        throw new Error("Please change the value...");
    };

    const like = await Like.create({
        like: req.body.like,
        user: req.user.id
    });

    res.status(200).json(like);
});

// UPDATE LIKES (PUT REQUEST - "/api/likes:id")
const updateLikes = asyncHandler(async (req, res) => {
    // FIND THE ID
    const like = await Like.findById(req.params.id);

    // CHECK FOR THE USER
    if (!req.user) {
        res.status(401);
        throw new Error("User not found...");
    };

    // MAKE SURE THE CURRENT USER MATCHES THE LIKE'S CREATOR
    if (like.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized...");
    };

    // FINDING THE LIKE AND UPDATING IT
    const updatedLike = Like.findByIdAndUpdate(req.params.id, req.body.like, { new: true });

    res.status(200).json(updatedLike);
});

module.exports = { getLikes, setLikes, updateLikes };

