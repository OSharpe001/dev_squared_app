const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const Like = require("../models/likesModel");
const Comment = require("../models/commentModel");

// GET BLOGS LIST (GET REQUEST - "/api/blogs")
const getBlogsList = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
});

// GET BLOG (GET REQUEST - "/api/blogs/:id")
const getBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
});

// SET BLOGS (POST REQUEST - "/api/blogs")
const setBlogs = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error("Denied. No title.");
    };

    if (!req.body.text) {
        res.status(400);
        throw new Error("Denied. No content.");
    };

    const blog = await Blog.create({
        title: req.body.title,
        text: req.body.text,
        user: req.user.id,
        userName: req.body.userName
    });

    res.status(200).json(blog);
});

// UPDATE BLOGS (PUT REQUEST - "/api/blogs/:id")
const updateBlogs = asyncHandler(async (req, res) => {
    // FIND ID
    const blog = await Blog.findById(req.params.id);

    // CHECK IF THE BLOG EXISTS
    if (!blog) {
        res.status(400);
        throw new Error("Blog not found.");
    };

    // CHECK FOR THE USER
    if (!req.user) {
        res.status(401);
        throw new Error("User not found.");
    };

    // CHECK TO SEE IF AN ITEM WAS CHANGED
    if ((req.body.title == blog.title && req.body.text === blog.text) || (!req.body.title && !req.body.text) || (req.body.title == blog.title && !req.body.text) || (req.body.text === blog.text && !req.body.title)) {
        res.status(401);
        throw new Error("Denied. Not edited.");
    };

    // MAKE SURE THE CURRENT USER MATCHES THE BLOG'S CREATOR
    if (blog.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized.");
    };

    // FINDING THE BLOG AND UPDATING IT
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedBlog);
});

// DELETE BLOGS (DELETE REQUEST - "/api/blogs/:id")
const deleteBlogs = asyncHandler(async (req, res) => {
    // FIND THE BLOG BY ID
    const blog = await Blog.findById(req.params.id);
    const associatedLikes = await Like.find({blogId: req.params.id});
    const associatedComments = await Comment.find({blogId: req.params.id});
    const associatedCommentsLikes = associatedComments.map(comment => comment._id);

    // CHECK IF THE BLOG EXISTS
    if (!blog) {
        res.status(400);
        throw new Error("Blog not found.");
    };

    // CHECK FOR THE USER
    if (!req.user) {
        res.status(401);
        throw new Error("User not found.");
    };

    // MAKE SURE THE CURRENT USER IS THE BLOG'S CREATOR
    if (blog.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized.");
    };

    // DELETE ALL LIKES ASSOICIATED WITH THIS BLOG
    associatedLikes.forEach(async (like) => {
        await Like.findOneAndRemove({ blogId: like.blogId });
    });

    // DELETE ALL COMMENTS ASSOCIATED WITH THIS BLOG
    associatedComments.forEach(async (comment) => {
        await Comment.findOneAndRemove({ blogId: comment.blogId });
    });

    // DELETE ALL LIKES THAT ARE ASSOCIATED WITH THE COMMENTS OF THIS BLOG
    associatedCommentsLikes.forEach(async (commentId) => {
        await Like.findOneAndRemove({ commentId: commentId });
    });

    // DELETE BLOG
    await Blog.findByIdAndRemove(req.params.id);

    res.status(200).json({ id: req.params.id });
});

module.exports = { getBlogsList, getBlog, setBlogs, updateBlogs, deleteBlogs };