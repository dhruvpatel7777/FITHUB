const express = require("express");
const router = express.Router();

const {
  addMember,
  getMembers,
  deleteMember,
  updateMember,
  getMembersSubscription,
} = require("../controller/member_controller");
const authMiddleware = require("../middleware/auth_middleware");

// Add a new member
router.post("/add", addMember);
// Get all members
router.get("/", getMembers);

// Delete a member by ID
router.delete("/:id", deleteMember);
// Update a member by ID
router.put("/:id", updateMember);
router.get("/membersPlan",authMiddleware, getMembersSubscription);

module.exports = router;
