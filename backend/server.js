const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5012;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/database");
// IMPORT "PATH" (A CORE PACKAGE OF NODE.JS) TO HELP RENDER THE FRONTEND
const path = require("path");

const app = express();

connectDB();

// MIDDLEWARE-- //
// // SETTING UP CORS OPTIONS TO AVOID ACCESS-CONTROL-ALLOW-ORIGIN ISSUES **THIS MUST BE PLACE ABOVE ALL OTHER MIDDLEWARE FUNCTIONS!**
// const corsOption = {
//     origin: "*" /*"https://devsquared.onrender.com"*/,
//     methods: ["PUT", "POST", "PATCH", "GET", "DELETE", "OPTIONS"],
//     credentials: true,
//     exposeHeaders: ["X-auth-token"],
//     preflightContinue: true,
//     allowedHeaders: ["Content-Type", "Accept", "Authorization", "X-auth-token", "Origin", "X-Requested-With"],
//     // maxAge: 86400,
// };
// // TO AVOID THE ACCESS-CONTROL-ALLOW-ORIGIN ISSUE
// app.use(cors(corsOption));
// // app.use(cors());

// TO ALLOW THE BODY OF A POST REQUEST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// USE ROUTES/USERROUTES TO HANDLE ANY ENDPOINTS THAT END WITH /API/USERS
app.use("/api/users", require("./routes/userRoutes"));
// USE ROUTES/BLOGROUTES TO HANDLE ANY ENDPOINTS THAT END WITH /API/BLOGS
app.use("/api/blogs", require("./routes/blogRoutes"));
// USE ROUTES/COMMENTROUTES TO HANDLE ANY ENDPOINTS THAT END WITH /API/COMMENTS
app.use("/api/blogs/comments", require("./routes/commentRoutes"));
// USE ROUTES/LIKESROUTES TO HANDLE ANY ENDPOINTS THAT END WITH /API/LIKES
app.use("/api/likes", require("./routes/likesRoutes"));

// SERVE FRONTEND
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html")))
} else {
    app.get("/", (req, res) => res.send("App isn't set to production..."));
};

// HANDLING ERRORS AND ASSOCIATED MESSAGES
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`The dev^2 server is currently running on port ${PORT}!`);
});