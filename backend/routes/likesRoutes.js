const express = require("express");
const router = express.Router();
const { getLikes, setLikes, updateLikes } = require("../controllers/likesController");

const { protect } = require("../middleware/authMiddleware");

// LIKES ROUTES
// CHAINING METHODS THAT HAVE THE SAME ROUTE
router.route("/").get(protect, getLikes).post(protect, setLikes);

router.route("/:id").put(protect, updateLikes);