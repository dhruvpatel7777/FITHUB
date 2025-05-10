const express = require("express");
const { bookClass, getUserBookedClasses, getAllBookings } = require("../controller/booking_controller"); // Ensure this path is correct
const router = express.Router();
const auth = require("../middleware/auth_middleware");
// Define the route for booking a class
router.post("/addbookclass", auth, bookClass); // Added authenticateToken middleware
router.get("/getAllBookings", getAllBookings); // Added authenticateToken middleware
router.get("/singleuserbookclass",auth, getUserBookedClasses); // Added authenticateToken middleware
module.exports = router;
