const mongoose = require("mongoose");

const likesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    userName: {
        type: String,
        required: [true, "Not Authorized..."],
    },
    blogId: {
        type: String,
    },
    commentId: {
        type: String,
    },
});

module.exports = mongoose.model("Likes", likesSchema);