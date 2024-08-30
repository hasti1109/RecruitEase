const express = require('express');
const { recruiterLogin, createRecruiter, deleteRecruiter } = require('../controllers/recruiterController');
const router = express.Router();

router.route('/login').post(recruiterLogin);
router.route('/').post(createRecruiter);
router.route('/:id').delete(deleteRecruiter);

module.exports = router;