const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth_middleware');
const { InsertFeedback, GetAllFeedback, DeleteFeedback, UpdateFeedback } = require('../controller/feedbackController');

// Feedback
router.post('/addfeedback', InsertFeedback);
router.get('/getfeedback', GetAllFeedback);
router.put('/updatefeedback/:id', UpdateFeedback);
router.delete('/deletefeedback/:id',DeleteFeedback);

module.exports = router;