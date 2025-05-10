const Class = require("../model/class_model");
const socket = require('../socket');

// Add a new class
const addClass = async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();

    // Emit socket event for new class
    const io = socket.getIO();
    io.emit("newClass", {
      title: "New Class Added!",
      message: `New class "${newClass.name}" has been added!`,
      classData: {
        name: newClass.name,
        instructor: newClass.instructor,
        date: newClass.date,
      }
    });

    res.json({
      success: true,
      message: "Class added successfully",
      newClass: newClass
    });
  } catch (error) {
    res.status(400).json({ message: "Error adding class", error });
  }
};

// Update an existing class
const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass) {
      return res.json({
        success: false,
        message: "Class not found",
      });
    }

    console.log(updatedClass,'updatedClass');
    
    return res.json({
      success: true,
      message: "Class updated successfully",
      updatedClass: updatedClass,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error updating class ..",
    });
  }
};

// Delete a class
const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.json({
        success: false,
        message: "Class not found",
      });
    }
    return res.json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: "Error deleting class", error });
  }
};

// Get all classes
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(400).json({ message: "Error fetching classes", error });
  }
};

module.exports = {
  addClass,
  updateClass,
  deleteClass,
  getClasses,
};