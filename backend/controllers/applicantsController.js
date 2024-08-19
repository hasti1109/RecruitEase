const asyncHandler = require('express-async-handler');
const Applicant = require('../models/applicant');
const {ObjectId} = require('mongodb')

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
  const {name, email, phoneNumber, city, resume, interestedRoles} = req.body;

  // Validate required fields
  if (!name || !email || !phoneNumber || !city || !resume || !interestedRoles) {
    res.status(400).json({ message: 'Please fill all the required fields.' });
    return;
  }

  const applicant = new Applicant({
    name, 
    email, 
    phoneNumber, 
    city, 
    resume, 
    interestedRoles, 
    status: "not applied"
  });

  const createdApplicant = await applicant.save();

  res.status(201).json({message: "Applicant added successfully", createdApplicant});
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

module.exports = {getApplicants, getApplicant, createApplicant};