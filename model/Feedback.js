const mongoose = require('mongoose');

// Define the Feedback Schema
const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    response: {
        type: String,
    },
    starRating: { // Ensure this field is of type Number
        type: Number,
        required: true,
    }
}, {
    timestamps: true  // This option adds createdAt and updatedAt fields
});

// Create a model from the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;