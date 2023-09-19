const asyncHandler = require("express-async-handler");
const Like = require("../models/likesModel");


// GET MY BLOG LIKES (GET REQUEST - "/api/likes")
const getAllLikes = asyncHandler(async (req, res) => {
    const likes = await Like.find({});
    res.status(200).json(likes);
});

// SET LIKES (POST REQUEST - "/api/likes")
const setLikes = asyncHandler(async (req, res) => {
    const {userName, commentId, blogId } = req.body;
    
    // FIND THE LIKE BY COMMENT/BLOG AND USERNAME
    const previousBlogLike = await Like.findOne({ userName, blogId });
    const previousCommentLike = await Like.findOne({ userName, commentId });

    if (!req.body.userName) {
        res.status(400);
        throw new Error("Not Authorized...");
    };

    if (!req.body.blogId && !req.body.commentId) {
        res.status(400);
        throw new Error("No Blog or Comment. Denied...");
    };

    if (!previousBlogLike || !previousCommentLike) {
        const like = await Like.create({
            user: req.user.id,
            userName: req.body.userName,
            blogId: req.body.blogId,
            commentId: req.body.commentId
        });
    };

    res.status(200).json(like);
});

// DELETE LIKES (DELETE REQUEST - "/api/likes:id")
const deleteLikes = asyncHandler(async (req, res) => {
    // FIND THE LIKE BY ID
    const like = await Like.findById(req.params.id);

    // CHECK IF THE LIKE DOESN'T EXIST
    if (!like) {
        res.status(400);
        throw new Error("Like not found...");
    };

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

    // FINDING THE LIKE AND DELETING IT
    await Like.findByIdAndRemove(req.params.id);

    res.status(200).json({ id: req.params.id });
});

module.exports = { getAllLikes, setLikes, deleteLikes };

