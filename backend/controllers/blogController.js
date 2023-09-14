const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");

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
        throw new Error("Please add a title...");
    };

    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add your blog's content...");
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
const updateBlogs = asyncHandler(async (req,res) => {
    // FIND ID
    const blog = await Blog.findById(req.params.id);

    // CHECK IF THE BLOG EXISTS
    if (!blog) {
        res.status(400);
        throw new Error("Blog not found...");
    };

    // CHECK FOR THE USER
    if (!req.user) {
        res.status(401);
        throw new Error("User not found...");
    };

    // CHECK TO SEE IF AN ITEM WAS CHANGED
    if ((req.body.title == blog.title && req.body.text === blog.text) || (!req.body.title && !req.body.text) || (req.body.title == blog.title && !req.body.text) || (req.body.text === blog.text && !req.body.title)) {
        res.status(401);
        throw new Error("No edits found...")
    };

    // MAKE SURE THE CURRENT USER MATCHES THE BLOG'S CREATOR
    if (blog.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized...");
    };

    // FINDING THE BLOG AND UPDATING IT
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedBlog);
});

// DELETE BLOGS (DELETE REQUEST - "/api/blogs/:id")
const deleteBlogs = asyncHandler(async (req, res) => {
    // FIND THE BLOG BY ID
    const blog = await Blog.findById(req.params.id);

    // CHECK IF THE BLOG EXISTS
    if (!blog) {
        res.status(400);
        throw new Error("Blog not found...");
    };

    // CHECK FOR THE USER
    if (!req.user) {
        res.status(401);
        throw new Error("User not found...");
    };

    // MAKE SURE THE CURRENT USER IS THE BLOG'S CREATOR
    if (blog.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized...");
    };

    await Blog.findByIdAndRemove(req.params.id);

    res.status(200).json({ id: req.params.id });
});

module.exports = { getBlogsList, getBlog, setBlogs, updateBlogs, deleteBlogs };