const express = require('express');
const {signupApplicant, loginApplicant} = require('../controllers/authController');
const router = express.Router();

router.route('/signup').post(signupApplicant);
router.route('/login').post(loginApplicant)

module.exports = router;