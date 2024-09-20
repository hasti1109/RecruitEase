const express = require('express');
const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');

const PORT = process.env.PORT || 5001
const app = express();

app.use(express.json());
app.use(cors({
  origin: true
}));

app.use('/files', express.static('files'));

const connectToDb = require('./config/db');
connectToDb();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applicants', require('./routes/applicantRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/recruiter', require('./routes/recruiterRoutes'));

app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
})