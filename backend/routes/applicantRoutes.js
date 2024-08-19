const express = require('express');
const router = express.Router();

const {getApplicants, createApplicant, getApplicant} = require('../controllers/applicantsController');

router.route('/').get(getApplicants).post(createApplicant);
router.route('/:id').get(getApplicant);

module.exports = router;