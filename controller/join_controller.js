const Join = require("../model/joinPlan"); // Adjust the path based on your folder structure

// Get All Joins
const getJoins = async (req, res) => {
  try {
    const joins = await Join.find().populate('userId planId'); // Populate to include user and plan details
    res.json(joins);
  } catch (error) {
    console.error("Error fetching joins:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add New Join
const addJoin = async (req, res) => {
  const { name, email, phone, userId, planId } = req.body;

  try {
    // Check if the user has already joined with the same details
    const existingJoin = await Join.findOne({ name, email, phone, userId, planId });
    if (existingJoin) {
      return res.json({
        success: false,
        message: "You have already joined with these details",
      });
    }
    // Create a new join entry
    const newJoin = new Join({ name, email, phone, userId, planId });
    await newJoin.save();
    res.json({
      success: true,
      message: "Join entry added successfully",
      newJoin: newJoin,
    });
  } catch (error) {
    console.error("Error adding join:", error);
    res.json({ message: "Internal server error" });
  }
};



const getUserJoinedPlans = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user ID from the token
    // Find join entries for the given userId and populate plan details
    const userJoinedPlans = await Join.find({ userId }).populate('planId userId' );
    if (!userJoinedPlans.length) {
      return res.json({
        success: false,
        message: "No plans joined by this user",
      });
    }

    res.json({
      success: true,
      joinedPlans: userJoinedPlans,
    });
  } catch (error) {
    console.error("Error fetching joined plans:", error);
    res.json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// Update Join
const updateJoin = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, userId, planId } = req.body;
  try {
    const updatedJoin = await Join.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        userId,
        planId,
      },
      { new: true }
    );

    if (!updatedJoin) {
      return res.status(404).json({ message: "Join entry not found" });
    }
    return res.json({
      success: true,
      message: "Join entry updated successfully",
      updatedJoin: updatedJoin,
    });
  } catch (error) {
    console.error("Error updating join:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Join
const deleteJoin = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJoin = await Join.findByIdAndDelete(id);

    if (!deletedJoin) {
      return res.json({
        success: false,
        message: "Join entry not found",
      });
    }
    return res.json({
      success: true,
      message: "Join entry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting join:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getJoins,
  addJoin,
  updateJoin,
  deleteJoin,
  getUserJoinedPlans
};
