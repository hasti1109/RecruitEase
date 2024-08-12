const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please enter your email id."],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number."],
    trim: true
  },
  resume: {
    type: [String],
    required: [true, "Please upload your resume."],
    trim: true
  },
  coverLetter: {
    type: String,
    required: false,
    trim: true
  },
  appliedPositions: {
    type: [String], // Array of strings representing positions applied for
    required: true,
    trim: true
  },
  status: { //should be visible to recruiter
    type: String,
    required: true,
    trim: true,
    enum: ['applied', 'not applied','under review', 'interviewing', 'offered', 'hired', 'rejected'], 
  }
});

module.exports = mongoose.model('Applicant', applicantSchema);
