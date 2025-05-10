const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notificationController");

// Routes for notifications
router.get("/", notificationController.getNotifications);
router.post("/", notificationController.createNotification);
router.delete("/:id", notificationController.deleteNotification);
router.put("/:id", notificationController.updateNotification);

module.exports = router;
