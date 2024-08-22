const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  applicant: {
    type: String,
    ref: 'Applicant',
    required: true
  },
  jobPosition: {
    type: String,
    ref: 'Job',
    required: true
  },
  resume:{ //selected from the resume array of applicant
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now // Default to the current date and time
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Under review', 'Accepted', 'Rejected'], // Enum for status
    default: 'Pending' // Default status to 'Pending'
  },
  interviewSchedule: {
    type: [String],
    ref: 'Interview',
    required: true,
    default: []
  },
  score:{
    type: Number,
    required: true,
  },
  keywords: { //extracted from resume
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Application', applicationSchema);
