const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    text: {
        type: String,
        required: [true, "Please add comment..."],
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