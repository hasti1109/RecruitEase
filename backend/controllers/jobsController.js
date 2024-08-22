const asyncHandler = require('express-async-handler');
const Job = require('../models/job');
const {ObjectId, Timestamp} = require('mongodb');

//@desc Get all jobs
//@route GET /api/jobs
const getJobs = asyncHandler(async (req,res) => {
  const jobs = await Job.find();
  if (jobs.length == 0){
    res.status(404).json({message:'No jobs exist.'})
    return
  }
  res.status(200).json(jobs);
});

//@desc Get one job
//@route GET /api/jobs/:id
const getJob = asyncHandler(async (req,res) => {
  const jobId = req.params.id;
  if(ObjectId.isValid(jobId)){
    const job = await Job.findById(jobId);
    if (!job){
      res.status(404).json({message:'Couldnt find job.'})
      return
    }
    res.status(200).json(job);
  }
  else{
    res.status(400).json({message: "Invalid job id"});
  }
});

//@desc Get all applications for a job
//@route GET /api/jobs/:id/applications
//returns an array of application objects
const getApplications = asyncHandler(async (req,res) => {
  const jobId = req.params.id;
  if(ObjectId.isValid(jobId)){
    const job = await Job.findById(jobId).populate('applications');
    if (!job){
      res.status(404).json({message:'Couldnt find job.'})
      return
    }
    res.status(200).json(job.applications);
  }
  else{
    res.status(400).json({message: "Invalid job id"});
  }
});

//@desc Create a job
//@route POST /api/jobs
const createJob = asyncHandler(async (req, res) => {
  const { title, description, salary, requirements, location, lastDateToApply, noOfOpenings,} = req.body;

  // Validate required fields
  if (!title || !description || !requirements || !location || !lastDateToApply || !noOfOpenings || !salary) {
    res.status(400).json({ message: 'Please fill all the required fields.' });
    return;
  }

  // Create a new job
  const job = new Job({
    title,
    description,
    requirements,
    location,
    timestamp: Date.now(), // Use current date
    lastDateToApply,
    noOfOpenings,
    salary
  });

  const createdJob = await job.save();

  res.status(201).json({message: "Job position added successfully", createdJob});
});

//@desc Update job details
//@route PUT /api/jobs/:id
const updateJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const updates = req.body;

  if(ObjectId.isValid(jobId)){
    const updatedJob = await Job.findByIdAndUpdate(jobId, updates, {
      new: true,
      runValidators: true
    });
  
    if(!updatedJob){
      res.status(404).json({message: "Job not found"});
      return;
    }
    res.status(200).json({message:"Job position updated successfully", updatedJob});
  }
  else{
    res.status(400).json({message: "Invalid job id"});
  }
});

//@desc Change job status
//@route PUT /api/jobs/changeStatus/:id
const changeJobStatus = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const {status} = req.body;

  if(ObjectId.isValid(jobId)){
    const updatedJob = await Job.findByIdAndUpdate(jobId, {status}, {
      new: true,
      runValidators: true
    });
  
    if(!updatedJob){
      res.status(404).json({message: "Job not found"});
      return;
    }
    res.status(200).json({message:"Job status updated successfully!", updatedJob});
  }
  else{
    res.status(400).json({message: "Invalid job id"});
  }
});

//@desc Delete a job
//@route DELETE /api/jobs/:id
const deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  
  if(ObjectId.isValid(jobId)){
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if(!deletedJob){
      res.status(404).json({message: "Job not found"});
      return;
    }
    res.status(200).json({message:"Job position deleted successfully", deletedJob});
  }
  else{
    res.status(400).json({message: "Invalid job id"});
  }
});

module.exports = {getJobs, createJob, getJob, getApplications, updateJob, deleteJob, changeJobStatus};