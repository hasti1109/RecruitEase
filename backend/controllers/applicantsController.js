const asyncHandler = require('express-async-handler');
const Applicant = require('../models/applicant');
const Job = require('../models/job')
const {ObjectId} = require('mongodb');
const multer = require('multer');
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

module.exports = {getApplicants, getApplicant, createApplicant, getJobs};