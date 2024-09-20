const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    trim: true,
  },
  header: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email id."],
    trim: true,
    unique: true, // Ensure email is unique
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  resume: {
    type: [String],
    trim: true,
  },
  coverLetter: {
    type: [String],
    trim: true,
  },
  interestedRoles: {
    type: [String],
    trim: true,
  },
  appliedPositions: {
    type: [String],
    trim: true,
  },
  savedJobs: {
    type: [String],
    trim: true, 
  },
  status: {
    type: String,
    trim: true,
    enum: ['applied', 'not applied', 'under review', 'interviewing', 'offered', 'hired', 'rejected'],
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
  },
});

module.exports = mongoose.model('Applicant', applicantSchema);
