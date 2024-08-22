const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the job title."],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please enter the job description."],
    trim: true
  },
  requirements: {
    type: [String],
    required: [true, "Please list the job requirements."],
    trim: true
  },
  keywords: {
    type:[String],
    required: true,
  },
  location: {
    type: String,
    required: [true, "Please specify the job location."],
    trim: true
  },
  salary: {
    type: String,
    required: [true, "Please specify salary"]
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  lastDateToApply: {
    type: Date,
    required: [true, "Please specify the last date to apply."]
  },
  noOfApplicants: {
    type: Number,
    default: 0, 
    required: true
  },
  applications: {
    type: [String],
    ref: 'Application',
    default: []
  },
  noOfOpenings: {
    type: Number,
    required: [true, "Please specify the number of openings."]
  },
  status: {
    type: String,
    required: [true, "Please specify the job status."],
    trim: true,
    enum: ['open', 'closed', 'paused'],
    default: 'open'
  },
  isJobClosed: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Job', jobSchema);
