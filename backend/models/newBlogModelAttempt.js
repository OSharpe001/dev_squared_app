const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
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
    comments: {
        type: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    likes: {
        type: Boolean,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("Blog", blogSchema);