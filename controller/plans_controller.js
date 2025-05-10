const Plan = require("../model/plans_model");

// Get All Plans
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add New Plan
const addPlan = async (req, res) => {
  const { name, price, benefits, validity } = req.body;

  try {
    const newPlan = new Plan({ name, price, benefits, validity });
    await newPlan.save();
    res.json({
      success: true,
      message: "Plan added successfully",
      newPlan: newPlan
    });
  } catch (error) {
    console.error("Error adding plan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Plan
const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { name, price, benefits, validity } = req.body;

  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      {
        name,
        price,
        benefits,
        validity,
      },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    return res.json({
      success: true,
      message: "Plan updated successfully",
      updatedPlan: updatedPlan,
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Plan
const deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlan = await Plan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.json({
        success: false,
        message: "Plan not found",
      });
    }
    return res.json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getPlans,
  addPlan,
  updatePlan,
  deletePlan,
};
