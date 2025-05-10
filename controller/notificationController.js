const Notification = require("../model/Notification");

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate('userId');
    
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new notification
exports.createNotification = async (req, res) => {
  const { type, message, link,user } = req.body;

  if (!type || !message) {
    return res.status(400).json({ message: "Type and message are required." });
  }
  const notification = new Notification({
    type,
    message,
    link,
    userId:user
  });
  try {
    const newNotification = await notification.save();
    res.json({success: true, message: "Notification sent successfully" ,newNotification});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Update a notification
exports.updateNotification = async (req, res) => {
  const { id } = req.params;
  const {  reply,user } = req.body;
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.json({ success:false,message: "Notification not found." });
    }
    if (reply) {
      notification.reply = reply; // Update reply if provided
    }
    if (user) {
      notification.userId = user; // Update reply if provided
    }
    const updatedNotification = await notification.save();
    res.json({ success: true, message: "Notification updated successfully.", updatedNotification });
  } catch (err) {
    res.json({ message: err.message });
  }
};


// Delete a notification
exports.deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Notification.findByIdAndDelete(id);

    if (!result) {
      return res.json({ success:false, message: "Notification not found." });
    }
    res.json({success:true, message: "Notification deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
