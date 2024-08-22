const express = require('express');
const { getApplications, createApplication } = require('../controllers/applicationController');
const router = express.Router();

router.route('/').get(getApplications).post(createApplication);

module.exports = router;