const express = require('express');
const router = express.Router();

const {getJobs, createJob, getJob, getApplicants, updateJob, deleteJob, changeJobStatus} = require('../controllers/jobsController');
router.route('/').get(getJobs).post(createJob);
router.route('/:id').get(getJob).put(updateJob).delete(deleteJob);
router.route('/:id/applicants').get(getApplicants);
router.route('/changeStatus/:id').put(changeJobStatus);

module.exports = router;