const Member = require("../model/member"); // Update the path to reflect the new member model

// Add a new member
const addMember = async (req, res) => {
  const { name, email, phone, age, address, subscription,status ,userId} = req.body;
  console.log(subscription,'subscription');
  
  
  // Validate request body
  if (!name || !email || !phone || !age || !address || !subscription||!status) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }
  // // Check if email already exists
  // const existingMember = await Member.findOne({ email });
  // if (existingMember) {
  //   return res.json({
  //     success: false,
  //     message: "Email already exists",
  //   });
  // }

  // Create a new member
  const newMember = new Member({
    name,
    email,
    phone,
    age,
    address,
    subscription,
    status,
    userId
  });

  try {
    const savedMember = await newMember.save();
    res.json({
      success: true,
      message: "Member added successfully",
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all members
const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMembersSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const members = await Member.find({ userId });

    // Check if members are found
    if (!members) {
      return res.json({ success:false, message: "No members found for this user." });
    }
    // Return members as JSON response
    res.json({ success:true, members});
  } catch (error) {
    console.error("Error fetching members:", error); // Log the error for debugging
    res.status(500).json({ message: "Error fetching members." });
  }
};



// Delete a member by ID
const deleteMember = async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (deletedMember) {
      res.json({
        success: true,
        message: "Member deleted successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Member not found",
      });    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a member by ID
const updateMember = async (req, res) => {
  const { name, email, phone, age, address, subscription } = req.body;

  // Validate request body
  if (!name || !email || !phone || !age || !address || !subscription) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, age, address, subscription },
      { new: true }
    );
    if (updatedMember) {
      res.json({
        success: true,
        message: "Member updated successfully",
        updatedMember: updatedMember,
      });
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addMember,
  getMembers,
  deleteMember,
  updateMember,
  getMembersSubscription
};
