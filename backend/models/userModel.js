const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Add full name."]
    },
    userName: {
        type: String,
        required: [true, "Create alias."],
        unique: [true, "Choose another alias."]
    },
    email: {
        type: String,
        required: [true, "Add email address."],
        unique: [true, "Account exists for this email."]
    },
    password: {
        type: String,
        required: [true, "Create a password."]
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
