const express = require("express");
const router = express.Router();
const {
  getPlans,
  addPlan,
  updatePlan,
  deletePlan,
} = require("../controller/plans_controller");
const { getJoins, addJoin, getUserJoinedPlans } = require("../controller/join_controller");
const authMiddleware = require("../middleware/auth_middleware");


router.get("/getPlans", getPlans);
router.post("/addPlan", addPlan);
router.put("/updatePlan/:id", updatePlan);
router.delete("/deletePlan/:id", deletePlan);

// Join Plan
router.get("/getjoinplan", getJoins);
router.get("/getsingleuserjoined",authMiddleware, getUserJoinedPlans);
router.post("/addjoinplan", addJoin);

// router.delete("/deletejoinplan/:id", deletePlan);

module.exports = router;
