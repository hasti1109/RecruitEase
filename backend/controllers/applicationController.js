const asyncHandler = require('express-async-handler');
const Application = require('../models/application');
const Applicant = require('../models/applicant');
const Job = require('../models/job');
const {ObjectId} = require('mongodb');

const calculateScore = (resumeKeywords, jobDescriptionKeywords) => {
  let score = 0;
  const keywordSet = new Set(jobDescriptionKeywords);

  // Count how many of the resume keywords match the job description keywords
  resumeKeywords.forEach(keyword => {
    if (keywordSet.has(keyword)) {
      score += 1;
    }
  });

  // Normalize the score based on the number of keywords in the job description
  score = (score / jobDescriptionKeywords.length) * 100; // Percentage-based score

  // Round the score to 2 decimal places
  score = parseFloat(score.toFixed(2));
  
  console.log(typeof(score)); // Output should be 'number'
  return score;
};

//@desc Get all applications
//@route GET /api/applications
const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find()
    .populate('applicant', 'name') // Populate the 'applicant' field and include only the 'name'
    .populate('jobPosition', 'title'); // Populate the 'jobPosition' field and include only the 'title'

  if (applications.length == 0) {
    res.status(404).json({ message: 'No applications exist.' });
    return;
  }

  res.status(200).json(applications);
});

//@desc Get all applications of an applicant
//@route GET /api/applications/applicant/:id
const getApplicationsofApplicant = asyncHandler(async (req, res) => {
  const applicantId = req.params.id;

  const applications = await Application.find({ applicant: applicantId })
    .populate('jobPosition', '_id title noOfApplicants'); 

  if (applications.length === 0) {
    res.status(404).json({ message: 'No applications found for the given applicant.' });
    return;
  }

  res.status(200).json(applications);
});


//@desc Create an application
//@route POST /api/applications
const createApplication = asyncHandler(async (req, res) => {
  const {applicant, jobPosition, resume, keywords} = req.body;

  // Validate required fields
  if (!applicant || !jobPosition || !resume) {
    res.status(400).json({ message: 'Please fill all the required fields.' });
    return;
  }

  console.log(applicant,jobPosition);

  // Check if the applicant and job exist
  const applicantExists = await Applicant.findById(applicant);
  const jobExists = await Job.findById(jobPosition);
  console.log(applicantExists, jobExists);

  if (!applicantExists || !jobExists) {
    res.status(404);
    throw new Error('Applicant or Job not found');
  }

  const jobKeywords = jobExists.keywords || ['abc'];
  const score = calculateScore(keywords, jobKeywords);

  const application = new Application({
    applicant,
    jobPosition,
    resume,
    score, //to be calculated based on keywords giving demo for now
    keywords //to be extracted from resume giving demo for now
  });

  const createdApplication = await application.save();

  //update applications array of that job
  jobExists.applications.push(createdApplication._id);

  //update no of applicants for that job
  jobExists.noOfApplicants += 1;
  await jobExists.save();

  //update status of that applicant
  applicantExists.status = "applied";
  
  //update appliedPositions array of that applicant
  applicantExists.appliedPositions.push(jobPosition);

  await applicantExists.save();

  res.status(201).json({message: "application added successfully", createdApplication, jobExists, applicantExists});
});

// @desc Delete n application
//@route DELETE /api/applications/:id
const deleteApplication = asyncHandler(async (req, res) => {
  const  applicationId  = req.params.id;

  if (!applicationId) {
    res.status(400).json({ message: 'Application ID is required.' });
    return;
  }
  const application = await Application.findById(applicationId);

  if (!application) {
    res.status(404).json({ message: 'Application not found.' });
    return;
  }

  // Find the related job and applicant
  const job = await Job.findById(application.jobPosition);
  const applicant = await Applicant.findById(application.applicant);

  if (!job || !applicant) {
    res.status(404).json({ message: 'Job or Applicant not found.' });
    return;
  }

  // Remove the application reference from the job
  job.applications = job.applications.filter(
    (appId) => appId.toString() !== applicationId
  );
  job.noOfApplicants -= 1;
  await job.save();

  // // Update the applicant's status and applied positions
  // applicant.status = 'not applied'; // Or adjust based on your requirements
  applicant.appliedPositions = applicant.appliedPositions.filter(
    (jobId) => jobId.toString() !== application.jobPosition.toString()
  );
  await applicant.save();

  // Delete the application
  await Application.findByIdAndDelete(applicationId);

  res.status(200).json({ message: 'Application deleted successfully' });
});

//@desc Get one application
//@route GET /api/applications/:id
const getApplication = asyncHandler(async (req,res) => {
  const applicationId = req.params.id;
  if(ObjectId.isValid(applicationId)){
    const application = await Application.findById(applicationId);
    if (!application){
      res.status(404).json({message:'Couldnt find application.'})
      return
    }
    res.status(200).json(application);
  }
  else{
    res.status(400).json({message: "Invalid application id"});
  }
});

//@desc Get applicant of that application
//@route GET /api/applications/:id/applicant
const getApplicant = asyncHandler(async (req,res) => {
  const applicationId = req.params.id;
  console.log(applicationId);
  if(ObjectId.isValid(applicationId)){
    const application = await Application.findById(applicationId);

    if (!application) {
      res.status(404);
      throw new Error('Application not found');
    }

    const applicant = await Applicant.findById(application.applicant);

    if (!applicant) {
      res.status(404);
      throw new Error('Applicant not found');
    }

    res.status(200).json(applicant);
  } else {
    res.status(400);
    throw new Error('Invalid application ID');
  }
});

module.exports = {getApplication, getApplications, createApplication, getApplicant, getApplicationsofApplicant, deleteApplication}