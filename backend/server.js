const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5012;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/database");

const app = express();

connectDB();

// MIDDLEWARE-- //
// SETTING UP CORS OPTIONS TO AVOID ACCESS-CONTROL-ALLOW-ORIGIN ISSUES **THIS MUST BE PLACE ABOVE ALL OTHER MIDDLEWARE FUNCTIONS!**
// const corsOption = {
//     *origin: "*",
//     *methods: "POST, PUT, PATCH, GET, DELETE, OPTIONS",
    // *allowedHeaders: "Content-Type, Accept, Origin, X-Requested-With",
//     *credentials: false,
//     *// preflightContinue: false,
//     *exposeHeaders: ["X-auth-token"],
//     // optionsSuccessStatus: 200
// };
// **ORIGINAL SET OF CORS OPTIONS
const corsOption = {
    origin: "*",
    methods: "POST, PUT, PATCH, GET, DELETE, OPTIONS",
    credentials: true,
    exposeHeaders: ["X-auth-token"],
    preflightContinue: true,
    allowedHeaders: "Content-Type, Accept, Authorization, X-auth-token, Origin, X-Requested-With",
};
// TO AVOID THE ACCESS-CONTROL-ALLOW-ORIGIN ISSUE
app.use(cors(corsOption));
// app.use(cors());

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

// HANDLING ERRORS AND ASSOCIATED MESSAGES
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`The dev^2 server is currently running on port ${PORT}!`);
});