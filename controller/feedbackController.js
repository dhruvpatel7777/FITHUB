const Feedback = require('../model/Feedback'); // Adjust the path according to your project structure

const InsertFeedback = async (req, res) => {
    try {
        const { name, email, message, starRating } = req.body; // Include starRating
        console.log('InsertFeedback request body:', req.body); // Log the request body

        // Create a new feedback instance
        const newFeedback = new Feedback({
            name,
            email,
            message,
            starRating: Number(starRating) // Ensure starRating is a Number
        });
        // Save the feedback to the database
        await newFeedback.save();
        console.log('Feedback saved successfully'); // Log success message
        return res.json({ success: true, message: 'Feedback submitted successfully!' });
    } catch (error) {
        console.error('Error in InsertFeedback:', error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Function to get all feedback
const GetAllFeedback = async (req, res) => {
    try {
        // Fetch all feedback from the database
        const feedbacks = await Feedback.find();
        return res.json({ success: true, feedbacks });
    } catch (error) {
        console.error('Error in GetAllFeedback:', error.message);
        return res.json({ success: false, message: 'Something went wrong' });
    }
};

// Function to delete feedback
const DeleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('DeleteFeedback ID:', id); // Log the ID
        // Delete feedback from the database
        await Feedback.findByIdAndDelete(id);
        return res.json({ success: true, message: 'Feedback deleted successfully!' });
    } catch (error) {
        console.error('Error in DeleteFeedback:', error.message);
        return res.json({ success: false, message: 'Internal Server Error' });
    }
};

// Function to update feedback response
const UpdateFeedback = async (req, res) => {
    try {
        const { id } = req.params; // Get the feedback ID from the URL parameters
        const { response } = req.body; // Get the new response from the request body
        console.log('UpdateFeedback ID:', id); // Log the ID
        console.log('UpdateFeedback request body:', req.body); // Log the request body

        // Find the feedback by ID and update its response
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            { response: response },
            { new: true } // Return the updated feedback
        );

        // If feedback is not found, send a 404 response
        if (!updatedFeedback) {
            return res.json({ success: false, message: 'Feedback not found' });
        }
        // Send a success response with the updated feedback
        return res.json({ success: true, message: 'Feedback response submitted successfully!', data: updatedFeedback });
    } catch (error) {
        console.error('Error in UpdateFeedback:', error.message);
        return res.json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    InsertFeedback,
    GetAllFeedback,
    DeleteFeedback,
    UpdateFeedback
};