const express = require('express');
const router = express.Router();

const {getApplicants, createApplicant, getApplicant, getJobs} = require('../controllers/applicantsController');

router.route('/').get(getApplicants).post(createApplicant);
router.route('/:id').get(getApplicant);
router.route('/:id/jobs').get(getJobs)

module.exports = router;