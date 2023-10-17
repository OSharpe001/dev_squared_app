const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    userName: {
        type: String,
        required: [true, "Not Authorized..."]
    },
    title: {
        type: String,
        required: [true, "Add blog title."],
        unique: [true, "Title previously used. Use new title."]
    },
    text: {
        type: String,
        required: [true, "Add blog content."]
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("Blog", blogSchema);