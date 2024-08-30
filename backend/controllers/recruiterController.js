const asyncHandler = require('express-async-handler');
const Recruiter = require('../models/recruiter');
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');

//@desc Login recruiter
//@route POST /api/recruiter/login
const recruiterLogin = asyncHandler(async (req, res) => {
  const {username, password} = req.body;
  if (!username || !password){
      return res.status(400).json({message : "Please enter username and password."});
  }

  const recruiter = await Recruiter.findOne({ username });
  if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter doesnt exist. Please check username' });
  }

  const isMatch = await bcrypt.compare(password, recruiter.password);
  if (!isMatch) {
      console.log(username, isMatch);
      return res.status(401).json({ message: 'Invalid username or password' });
  }
  res.status(200).json({ message: 'Login successful', recruiterId : recruiter._id });

});

//@desc create recruiter
//@route POST /api/recruiter
const createRecruiter = asyncHandler(async(req,res) => {
  const {name, username, password} = req.body;
  if (!name || !username || !password){
    return res.status(400).json({message: "Please provide both username and password."});
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const recruiter = new Recruiter({
    name,
    username,
    password: hashedPassword
  });

  const createdRecruiter = await recruiter.save();
  return res.status(201).json(createdRecruiter);
});

//@desc Delete recruiter
//@route Delete /api/recruiter/:id
const deleteRecruiter = asyncHandler(async(req,res) => {
  const {id} = req.params;
  if(ObjectId.isValid(id)){
    if (!id){
      return res.status(400).json({message: "Please provide recruiter id."});
    }
    await Recruiter.findByIdAndDelete(id);
    return res.status(201).json({message: "Recruiter deleted successfully."});
  }
  else{
    return res.status(500).json({message: "Provide a valid recruiter mongo id"});
  }
});

module.exports = {recruiterLogin, createRecruiter, deleteRecruiter};