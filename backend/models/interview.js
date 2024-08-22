const mongoose = require('mongoose');

const interviewSchema = mongoose.Schema({
  application: {
    type: String,
    ref: 'Application',
    required: true
  },
  interviewDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  interviewer: {
    type: [String],
    required: true,
    default: []
  }
});

module.exports = mongoose.model('Interview', interviewSchema);