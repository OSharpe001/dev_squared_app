const express = require("express");
const router = express.Router();
const { getComments, setComments, updateComments, deleteComments } = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

// COMMENT ROUTES--
// (CHAINING METHODS THAT HAVE THE SAME ROUTE)
router.route("/").get(protect, getComments).post(protect, setComments);

router.route("/:id").delete(protect, deleteComments).put(protect, updateComments);

module.exports = router;