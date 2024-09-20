const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Applicant = require('../models/applicant'); // Assuming you have a User model defined in models/User.js

//@desc Sign up applicant
//@route POST /api/auth/signup
const signupApplicant = asyncHandler(async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Validate input
    if (!email || !password || !confirmPassword) {
        return res.status(404).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await Applicant.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new Applicant({
        email,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', email});
});

//@desc Login applicant
//@route POST /api/auth/login
const loginApplicant = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({message : "Please enter email and password."});
    }
    // Check if user already exists
    const existingUser = await Applicant.findOne({ email });
    if (!existingUser) {
        return res.status(404).json({ message: 'User doesnt exist. Please check email id' });
    }
    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        console.log(email, isMatch);
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token or session here (optional)
    // Example:
    // const token = generateToken(applicant._id);

    res.status(200).json({ message: 'Login successful', userId : existingUser._id });

});

module.exports = {signupApplicant, loginApplicant};
