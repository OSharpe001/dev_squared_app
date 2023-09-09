const express = require("express");
const router = express.Router();
const { getBlogsList, getBlog, setBlogs, updateBlogs, deleteBlogs } = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");

// BLOGS ROUTES--
// (CHAINING METHODS THAT HAVE THE SAME ROUTE)
router.route("/").get(getBlogsList).post(protect, setBlogs);

router.route("/:id").get(getBlog).put(protect, updateBlogs).delete(protect, deleteBlogs);

module.exports = router;