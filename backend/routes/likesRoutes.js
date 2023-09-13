const express = require("express");
const router = express.Router();
const { getAllLikes, setLikes, deleteLikes } = require("../controllers/likesController");

const { protect } = require("../middleware/authMiddleware");

// LIKES ROUTES
// CHAINING METHODS THAT HAVE THE SAME ROUTE
router.route("/").get(getAllLikes).post(protect, setLikes);

router.route("/:id").delete(protect, deleteLikes);

module.exports = router;