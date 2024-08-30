const asyncHandler = require('express-async-handler');
const Applicant = require('../models/applicant');
const Job = require('../models/job')
const {ObjectId} = require('mongodb');

//@desc Get all applicants
//@route GET /api/applicants
const getApplicants = asyncHandler(async (req,res) => {
  const applicants = await Applicant.find();
  if (applicants.length == 0){
    res.status(404).json({message:'No applicants exist.'})
    return
  }
  res.status(200).json(applicants);
});

//@desc Create an applicant
//@route POST /api/applicants
const createApplicant = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, city, header, description, resume, interestedRoles } = req.body;

  // Validate required fields
  if (!name || !email || !phoneNumber || !city || !resume || !interestedRoles || !header || !description) {
    console.log(name, email, phoneNumber, city, header, description, resume, interestedRoles)
    return res.status(400).json({ message: 'Please fill all the required fields.' });
  }

  // Check if the applicant email already exists
  const existingApplicant = await Applicant.findOne({ email });

  if (existingApplicant) {
    // Update existing applicant
    existingApplicant.name = name;
    existingApplicant.phoneNumber = phoneNumber;
    existingApplicant.city = city;
    existingApplicant.header = header;
    existingApplicant.description = description;
    existingApplicant.resume = resume;
    existingApplicant.interestedRoles = interestedRoles;

    const updatedApplicant = await existingApplicant.save();

    return res.status(201).json(updatedApplicant._id);
  } else {
    const applicant = new Applicant({
      name,
      email,
      phoneNumber,
      city,
      header,
      description,
      resume,
      interestedRoles,
      status: 'not applied',
    });

    const createdApplicant = await applicant.save();
    console.log(createdApplicant);
    return res.status(201).json(createdApplicant._id);
  }
});

//@desc Get one applicant
//@route GET /api/applicants/:id
const getApplicant = asyncHandler(async (req,res) => {
  const applicantId = req.params.id;
  if(ObjectId.isValid(applicantId)){
    const applicant = await Applicant.findById(applicantId);
    if (!applicant){
      res.status(404).json({message:'Couldnt find applicant.'})
      return
    }
    res.status(200).json(applicant);
  }
  else{
    res.status(400).json({message: "Invalid applicant id"});
  }
});

//@desc Get jobs applied for that applicant
//@route GET /api/applicants/:id/jobs
const getJobs = asyncHandler(async (req, res) => {
  const applicantId = req.params.id;

  if (ObjectId.isValid(applicantId)) {
    const applicant = await Applicant.findById(applicantId);

    if (!applicant) {
      res.status(404).json({ message: 'Could not find applicant.' });
      return;
    }

    // Fetch the job details for each job ID in the appliedPositions array
    const jobs = await Job.find({ _id: { $in: applicant.appliedPositions } }).select('_id title location');

    res.status(200).json(jobs);
  } else {
    res.status(400).json({ message: 'Invalid applicant ID' });
  }
});

module.exports = {getApplicants, getApplicant, createApplicant, getJobs};