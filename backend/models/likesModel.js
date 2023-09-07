const mongoose = require("mongoose");

const likesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    like: Boolean,
});

module.exports = mongoose.model("Likes", likesSchema);