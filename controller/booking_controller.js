const Booking = require("../model/booking_model");
const Class = require("../model/class_model");

const bookClass = async (req, res) => {
  try {
    const { classId } = req.body;
    if (!classId) {
      return res.json({ success: false, message: "Class ID is required" });
    }
    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.json({ success: false, message: "Class not found" });
    }
    const existingBooking = await Booking.findOne({
      classId,
      userId: req.user.id,
    });
    if (existingBooking) {
      return res.json({ success: false, message: "Class already booked" });
    }
    const newBooking = new Booking({
      classId: classItem._id,
      userId: req.user.id,
      bookedAt: new Date(),
    });
    console.log(newBooking,'newBooking');
    
    await newBooking.save();
    res.json({ success: true, message: "Class booked successfully", newBooking });
  } catch (error) {
    console.error("Error booking class:", error.message);
    res.json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

const getUserBookedClasses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userBookings = await Booking.find({ userId }).populate('classId userId');
    if (!userBookings.length) {
      return res.json({ success: false,});
    }
    res.json({ success: true, bookedClasses: userBookings });
  } catch (error) {
    console.error("Error fetching booked classes:", error.message);
    res.json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
const getAllBookings = async (req, res) => {
  try {
    const allBookings = await Booking.find().populate('classId').populate('userId');
    if (!allBookings.length) {
      return res.json({ success: false,});
    }
    res.json({ success: true, bookings: allBookings });
  } catch (error) {
    console.error("Error fetching all bookings:", error.message);
    res.json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


module.exports = {
  bookClass,
  getUserBookedClasses,
  getAllBookings
};
