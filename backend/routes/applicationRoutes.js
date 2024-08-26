const express = require('express');
const { getApplications, createApplication, getApplication, getApplicant } = require('../controllers/applicationController');
const router = express.Router();

router.route('/').get(getApplications).post(createApplication);
router.route('/:id').get(getApplication);
router.route('/:id/applicant').get(getApplicant);

module.exports = router;