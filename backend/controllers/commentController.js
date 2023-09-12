const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");
// const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// GET ALL BLOG COMMENTS (GET REQUEST - "/api/blog_id/comments")
const getBlogComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find({ blog: req.blog.id });
    res.status(200).json(comments);
});

// GET USER COMMENTS (GET REQUEST - "/api/blog_id/comments")
const getUserComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find({ user: req.user.id });
    res.status(200).json(comments);
});

// SET COMMENTS (POST REQUEST - "/api/blogs/comments")
const setComments = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add your comment...");
    };
    const comment = await Comment.create({
        text: req.body.text,
        userName: req.body.userName,
        blogId: req.body.blogId,
        user: req.user.id
    });

    res.status(200).json(comment);
});

// UPDATE COMMENTS (PUT REQUEST - "/api/blog_id/comments/:id")
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

// DELETE COMMENTS (DELETE REQUEST - "/api/blog_id/comments/:id")
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


module.exports = { getBlogComments, getUserComments, setComments, updateComments, deleteComments };



// *****MY ATTEMPT TO MAKE A NEW "UPDATE COMMENTS" *********WILL HAVE TO TRY, LATER...
// // UPDATE COMMENTS (PUT REQUEST - "/api/blog_id/comments/:id")
// const updateComments = asyncHandler(async (req, res) => {
//     // FIND THE COMMENT'S ID
//     const comment = await Comment.findById(req.body.text);
//     const creator = await Comment.findById(req.body.userName);
//     const blogId = await Comment.findById(req.body.blogId);

//     // CHECK IF THE GOAL EXISTS TO BE UPDATED
//     if (!comment) {
//         res.status(400);
//         throw new Error("Comment does not exist...");
//     };

//     // CHECK IF USER EXISTS
//     if (!creator) {
//         res.status(401);
//         throw new Error("Creator not found...");
//     };

//     // CHECK IF BLOG EXISTS
//     if (!blogId) {
//         res.status(401);
//         throw new Error("Associated blog not found...");
//     };

//     // MAKE SURE THE CURRENT USER WROTE THE COMMENT
//     if (comment.user.toString() !== req.user.id) {
//         res.status(401);
//         throw new Error("Not authorized...");
//     };

//     // FINDING THE COMMENT (IF IT EXISTS) AND UPDATING IT
//     const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });

//     res.status(200).json(updatedComment);
// });