const express = require("express");
const router = express.Router();
const { getBlogComments, getUserComments, setComments, updateComments, deleteComments } = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

// COMMENT ROUTES--
// (CHAINING METHODS THAT HAVE THE SAME ROUTE)
router.route("/").get(getUserComments).post(protect, setComments);

router.route("/:id").get(getBlogComments).put(protect, updateComments).delete(protect, deleteComments);

module.exports = router;