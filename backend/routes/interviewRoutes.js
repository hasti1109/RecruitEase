const express = require('express');
const router = express.Router();

const {scheduleInterview, getInterviews} = require('../controllers/interviewController');
router.route('/').post(scheduleInterview).get(getInterviews);

module.exports = router;