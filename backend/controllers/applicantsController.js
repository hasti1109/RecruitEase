const asyncHandler = require('express-async-handler');
const Applicant = require('../models/applicant');
const Job = require('../models/job')
const {ObjectId} = require('mongodb');
const { upload } = require('../middleware/fileUpload');

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
  // Upload the resume file using multer
  upload.single('resume')(req, res, async (err) => {
    if (err) {
      return res.status(503).json({ message: err.message });
    }

    const { name, email, phoneNumber, city, header, description, interestedRoles } = req.body;

    console.log(req.body);

    // Check for all required fields
    if (!name || !email || !phoneNumber || !city || !header || !description || !interestedRoles || !req.file) {
      console.log(name, email, phoneNumber, city, header, description, req.file?.path, interestedRoles);
      return res.status(400).json({ message: 'Please fill all the required fields.' });
    }

    const existingApplicant = await Applicant.findOne({ email });

    if (existingApplicant) {
      // Update the existing applicant's details
      existingApplicant.name = name;
      existingApplicant.phoneNumber = phoneNumber;
      existingApplicant.city = city;
      existingApplicant.header = header;
      existingApplicant.description = description;
      existingApplicant.resume = req.file.path;
      existingApplicant.interestedRoles = interestedRoles;

      const updatedApplicant = await existingApplicant.save();
      return res.status(200).json(updatedApplicant._id);
    } else {
      // Create a new applicant
      const applicant = new Applicant({
        name,
        email,
        phoneNumber,
        city,
        header,
        description,
        resume: req.file.path, 
        interestedRoles,
        status: 'not applied',
      });

      const createdApplicant = await applicant.save();
      return res.status(201).json(createdApplicant._id);
    }
  });
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

//@desc Get saved jobs for that applicant
//@route GET /api/applicants/:id/savedjobs
const getSavedJobs = asyncHandler(async (req, res) => {
  const applicantId = req.params.id;

  if (ObjectId.isValid(applicantId)) {
    const applicant = await Applicant.findById(applicantId);

    if (!applicant) {
      res.status(404).json({ message: 'Could not find applicant.' });
      return;
    }

    // Fetch the job details for each job ID in the appliedPositions array
    const jobs = await Job.find({ _id: { $in: applicant.savedJobs } }).select('_id title location requirements noOfOpenings salary timestamp description lastDateToApply noOfApplicants');

    res.status(200).json(jobs);
  } else {
    res.status(400).json({ message: 'Invalid applicant ID' });
  }
});

//@desc Add a job to savedJobs
//@route POST /api/applicants/saveJob
const saveJob = asyncHandler(async (req, res) => {
  const {applicantID,jobID} = req.body;

  if (ObjectId.isValid(applicantID)) {
    const applicant = await Applicant.findById(applicantID);
    const jobExists = await Job.findById(jobID);
    console.log(applicant, jobExists);

    if (!applicant || !jobExists) {
      res.status(404);
      throw new Error('Applicant or Job not found');
    }

    applicant.savedJobs.push(jobID);
    await applicant.save();

    res.status(201).json({message: 'Job saved successfully.'});
  } else {
    res.status(400).json({ message: 'Invalid applicant ID' });
  }
});

//@desc post if the job is saved or not
//@route POST /api/applicants/isJobSaved
const isJobSaved = asyncHandler(async (req, res) => {
  const {applicantID, jobID} = req.body;

  if (ObjectId.isValid(applicantID)) {
    const applicant = await Applicant.findById(applicantID);

    if (!applicant) {
      res.status(404).json({ message: 'Could not find applicant.' });
      return;
    }
    const isJobSaved = applicant.savedJobs.includes(jobID);

    res.status(200).json(isJobSaved);
  } else {
    res.status(400).json({ message: 'Invalid applicant ID' });
  }
});

//@desc delete the job from saved
//@route DELETE /api/applicants/removeJob
const removeSavedJob = asyncHandler(async (req, res) => {
  const { applicantID, jobID } = req.body;
  console.log(applicantID, jobID);

  if (ObjectId.isValid(applicantID)) {
    const applicant = await Applicant.findById(applicantID);

    if (!applicant) {
      res.status(404);
      throw new Error('Applicant not found');
    }

    // Check if the job is saved
    const isJobSaved = applicant.savedJobs.includes(jobID);
    if (!isJobSaved) {
      return res.status(400).json({ message: 'Job is not saved' });
    }

    // Remove the job from the savedJobs array
    applicant.savedJobs = applicant.savedJobs.filter((savedJobID) => savedJobID !== jobID);
    await applicant.save();

    res.status(200).json({ message: 'Job removed from saved jobs successfully.' });
  } else {
    res.status(400).json({ message: 'Invalid applicant ID' });
  }
});


module.exports = {getApplicants, getApplicant, createApplicant, getJobs, getSavedJobs, saveJob, isJobSaved, removeSavedJob};