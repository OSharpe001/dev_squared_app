const express = require("express");
const router = express.Router();
const { getComments, setComments, updateComments, deleteComments } = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

// COMMENT ROUTES--
// (CHAINING METHODS THAT HAVE THE SAME ROUTE)
router.route("/").get(getComments).post(protect, setComments);

router.route("/:id").put(protect, updateComments).delete(protect, deleteComments);

module.exports = router;