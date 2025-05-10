const express = require("express");
const router = express.Router();
const { addClass,
    updateClass,
    deleteClass,
    getClasses, } = require("../controller/class_controller");
const { bookClass } = require("../controller/booking_controller");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/bookClass", authenticateToken, bookClass);
// Route for adding a class
router.post("/addClass", addClass);
// Route for updating a class
router.put("/updateClass/:id", updateClass);
// Route for deleting a class
router.delete("/deleteClass/:id", deleteClass);
// Route for getting all classes
router.get("/getClasses", getClasses);

module.exports = router;
