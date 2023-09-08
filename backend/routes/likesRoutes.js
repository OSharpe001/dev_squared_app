const express = require("express");
const router = express.Router();
const { getLike, setLike, updateLike } = require("../controllers/likesController");

const { protect } = require("../middleware/authMiddleware");

// LIKES ROUTES
// CHAINING METHODS THAT HAVE THE SAME ROUTE
router.route("/").get(protect, getLike).post(protect, setLike);

router.route("/:id").put(protect, updateLike);