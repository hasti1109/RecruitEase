const express = require('express');
const { getApplications, createApplication, getApplication, getApplicant, getApplicationsofApplicant, deleteApplication } = require('../controllers/applicationController');
const router = express.Router();

router.route('/').get(getApplications).post(createApplication);
router.route('/:id').get(getApplication).delete(deleteApplication);
router.route('/:id/applicant').get(getApplicant);
router.route('/applicant/:id').get(getApplicationsofApplicant);

module.exports = router;