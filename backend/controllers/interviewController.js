const asyncHandler = require('express-async-handler');
const Interview = require('../models/interview');
const Application = require("../models/application")
const {ObjectId} = require('mongodb');

//@desc Create an interview
//@route POST /api/interviews
const scheduleInterview = asyncHandler(async (req, res) => {
  const { application, interviewDate, location, interviewer } = req.body;

  try {
    // Find the application document
    const appl = await Application.findById(application);

    if (!appl) {
      return res.status(404).json({ message: "Application not found." });
    }

    // Create a new interview document
    const newInterview = new Interview({
      application,
      interviewDate,
      location,
      interviewer,
    });

    // Save the new interview document first
    await newInterview.save();

    // Push the interview ID to the application's interviewSchedule array
    appl.interviewSchedule.push(newInterview._id);
    
    // Save the updated application document
    await appl.save();

    res.status(201).json(newInterview);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});


//@desc Get all interviews
//@route GET /api/interviews
const getInterviews = asyncHandler(async (req,res) => {
  const interviews = await Interview.find()
    .populate({
      path: 'application',
      populate: [
        { path: 'applicant', select: 'name' },
        { path: 'jobPosition', select: 'title' }
      ]
    });

  if (interviews.length == 0){
    res.status(404).json({message:'No interviews exist.'})
    return
  }
  res.status(200).json(interviews);
});


module.exports = {scheduleInterview, getInterviews}