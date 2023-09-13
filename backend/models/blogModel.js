const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    userName: {
        type: String,
        required: [true, "You must be signed in to create a blog..."],
    },
    title: {
        type: String,
        required: [true, "Please add your blog title..."],
        unique: [true, "This title has been previously used. Please think of another title..."],
    },
    text: {
        type: String,
        required: [true, "Please add your blog content..."],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Blog", blogSchema);