const express = require('express');
const router = express.Router();

const {getApplicants, createApplicant, getApplicant, getJobs, saveJob, getSavedJobs, isJobSaved, removeSavedJob} = require('../controllers/applicantsController');

router.route('/').get(getApplicants).post(createApplicant);
router.route('/:id').get(getApplicant);
router.route('/:id/jobs').get(getJobs)
router.route('/saveJob').post(saveJob);
router.route('/:id/savedjobs').get(getSavedJobs);
router.route('/isJobSaved').post(isJobSaved);
router.route('/removeJob').put(removeSavedJob);

module.exports = router;