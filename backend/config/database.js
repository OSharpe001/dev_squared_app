const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGODB CONNECTED: ${conn.connection.host}`);
    } catch (err) {
        console.log("THERE IS AN ERROR CONNECTING TO THE DATABASE: ", err);
        process.exit(1);
    };
};

module.exports = connectDB;