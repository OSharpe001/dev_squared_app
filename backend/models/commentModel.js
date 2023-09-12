const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    text: {
        type: String,
        required: [true, "Please add your comment..."],
        unique: [true, "This comment has been previously used. Please think of another comment..."],
    },
    userName: {
        type: String,
        required: [true, "Not Authorized..."],
    },
    blogId: {
        type: String,
        required: [true, "No Blog. Denied..."],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Comment", commentSchema);