const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your full name..."],
    },
    userName: {
        type: String,
        required: [true, "Please create alias..."],
        unique: [true, "Alias already used. Please choose another..."],
    },
    email: {
        type: String,
        required: [true, "Please add your email address..."],
        unique: [true, "Prior account exists for this email..."],
    },
    password: {
        type: String,
        required: [true, "Please create a password..."],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
