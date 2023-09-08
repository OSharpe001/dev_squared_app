const Comment = require("../models/commentModel");
// const Blog = require("..models/blogModel");
// const User = require("..models/userModel");
const asyncHandler = require("express-async-handler");

// GET COMMENTS (GET REQUEST - "/api/comments")
const getComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find({ user: req.user.id });
    res.status(200).json(comments);
});

// SET COMMENTS (POST REQUEST - "/api/comments")
const setComments = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add your comment...");
    };
    const comment = await Comment.create({
        text: req.body.text,
        user: req.user.id,
        // blog: req.blog.id,
    });

    res.status(200).json(comment);
});

// UPDATE COMMENTS (PUT REQUEST - "/api/comments/:id")
const updateComments = asyncHandler(async (req, res) => {
    // FIND THE COMMENT'S ID
    const comment = await Comment.findById(req.params.id);

    // CHECK IF THE GOAL EXISTS TO BE UPDATED
    if (!comment) {
        res.status(400);
        throw new Error("Comment does not exist...");
    };

    // CHECK IF USER EXISTS
    if (!req.user) {
        res.status(401);
        throw new Error("Creator not found...");
    };

    // CHECK IF BLOG EXISTS
    if (!req.blog) {
        res.status(401);
        throw new Error("Associated blog not found...");
    };

    // MAKE SURE THE CURRENT USER WROTE THE COMMENT
    if (comment.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized...");
    };

    // FINDING THE COMMENT (IF IT EXISTS) AND UPDATING IT
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedComment);
});

// DELETE COMMENTS (DELETE REQUEST - "/api/comments/:id")
const deleteComments = asyncHandler(async (req, res) => {

    // FIND THE COMMENT BY ID
    const comment = Comment.findById(req.params.id);

    // CHECK IF THE COMMENT DOESN'T EXIST
    if (!comment) {
        res.status(400);
        throw new Error("Comment not found...");
    };

    // CHECK FOR THE USER
    if (!req.user) {
        res.status(401);
        throw new Error("Creator not found...");
    };

    // CHECK FOR THE ASSOCIATED BLOG
    if (!req.blog) {
        res.status(401);
        throw new Error("Associated blog not found...");
    };

    // MAKE SURE THE CURRENT USER MATCHES THE COMMENT'S CREATOR
    if (comment.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized...");
    };

    await Comment.findByIdAndRemove(req.params.id);

    res.status(200).json({ id: req.params.id });
});


module.exports = { getComments, setComments, updateComments, deleteComments };