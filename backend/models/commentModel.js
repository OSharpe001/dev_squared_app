const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: String,
        required: [true, "Add comment."]
    },
    userName: {
        type: String,
        required: [true, "Not authorized."]
    },
    blogId: {
        type: String,
        required: [true, "No blog found."]
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("Comment", commentSchema);