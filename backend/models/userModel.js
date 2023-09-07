const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your full name..."],
    },
    userName: {
        type: String,
        required: [true, "Please create an alias..."],
        unique: [true, "Sorry, there's already an account under this alias. Please choose another..."],
    },
    email: {
        type: String,
        required: [true, "Please add your email address..."],
        unique: [true, "There's already an account for this email address..."],
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
